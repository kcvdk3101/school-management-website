import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  IconButton,
  Grid,
  TextField,
} from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { rejectedStudent } from '../../features/authenticate/authSlice'
import { StudentModel } from '../../models/student.model'
import NoData from '../commons/NoData'
import EditIcon from '@mui/icons-material/Edit'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { editInfoStudent } from '../../features/student/studentsSlice'

interface StudentAcceptedTableProps {
  listStudentAccepted: StudentModel[]
}

interface RowData extends StudentModel {
  mode?: boolean
}

interface HeadCell {
  id: keyof RowData
  label: string
}

type EditFormInput = {
  internshipThirdGrade: number
}

const headCells: HeadCell[] = [
  {
    id: 'identityNumber',
    label: 'Identity number',
  },
  {
    id: 'fullName',
    label: 'Full name',
  },
  {
    id: 'class',
    label: 'Class',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    label: 'Phone',
  },
  {
    id: 'term',
    label: 'Term',
  },
  {
    id: 'status',
    label: 'Internship status',
  },
  {
    id: 'internshipFinalGrade',
    label: 'Final grade',
  },
]

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const thirdGradeSchema = yup.object({
  internshipThirdGrade: yup
    .number()
    .integer()
    .positive()
    .min(0, 'Point must be greater than or equal to 0')
    .max(10, 'point does not exceed 10')
    .required('This field is required')
    .typeError('This field is not a number'),
})

const StudentAcceptedTable: React.FC<StudentAcceptedTableProps> = ({ listStudentAccepted }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(thirdGradeSchema),
  })

  const [selected, setSelected] = useState<readonly string[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [loadingThirdGrade, setLoadingThirdGrade] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)
  const [thirdgradeForm, setThirdgradeForm] = useState(false)

  const handleOpenAlert = () => {
    setOpenAlert(true)
  }

  const handleCloseAlert = () => {
    setOpenAlert(false)
  }

  const handleOpenThirdgradeForm = (idx: number) => {
    setCurrentIndex(idx)
    setThirdgradeForm(true)
  }

  const handleCloseThirdgradeForm = () => {
    setThirdgradeForm(false)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = listStudentAccepted.map((n) => n.id as string)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleRejectStudent = async () => {
    setLoading(true)
    try {
      let teacher = selected.map((id) => ({
        studentId: id,
        teacherId: user.teacherId as string,
      }))
      const response = await dispatch(rejectedStudent(teacher))
      if (response.meta.requestStatus === 'fulfilled') {
        setLoading(false)
        toast.success(t('Unaccepted successfully !'))
      }
    } catch (error) {
      toast.error(error as any)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: EditFormInput) => {
    let student = listStudentAccepted[currentIndex]
    setLoadingThirdGrade(true)
    try {
      const response = await dispatch(
        editInfoStudent({
          id: student.id as string,
          data: {
            ...student,
            internshipThirdGrade: data.internshipThirdGrade,
          },
        })
      )
      if (response.meta.requestStatus === 'fulfilled') {
        setLoadingThirdGrade(false)
        toast.success(t('Update successfully !'))
      }
    } catch (error) {
      toast.error('Cannot update student grade')
    } finally {
      setLoadingThirdGrade(false)
      handleCloseThirdgradeForm()
    }
  }

  return (
    <Box>
      <Box className={classes.toolbar}>
        <Typography>
          {selected.length === 0 ? '' : `${selected.length} sinh viên được chọn`}
        </Typography>
        <Button
          color='secondary'
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          type='button'
          disabled={selected.length === 0}
          onClick={handleOpenAlert}
        >
          {loading ? <CircularProgress size={24} /> : `${t('Cancel accept')}`}
        </Button>
      </Box>
      {listStudentAccepted.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{
              width: 'max-content',
            }}
            aria-labelledby='tableTitle'
            size={'medium'}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox' component='th' scope='row'>
                  <Checkbox
                    color='primary'
                    checked={selected.length > 0}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell align='left' size='small'>
                  {t('Third grade')}
                </TableCell>
                {headCells.map((headCell, idx) => (
                  <TableCell
                    key={idx}
                    align='left'
                    size='small'
                    sx={{
                      py: 1,
                    }}
                  >
                    {t(`${headCell.label}`)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listStudentAccepted.map((row, idx) => {
                const isItemSelected = isSelected(row.id as string)

                return (
                  <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell padding='checkbox' component='th' scope='row'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.id as string)}
                      />
                    </TableCell>
                    <TableCell align='center' size='small'>
                      <Tooltip title={`${t('Edit')}`} placement='top'>
                        <IconButton onClick={() => handleOpenThirdgradeForm(idx)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align='left' size='small'>
                      {row.identityNumber}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.fullName}
                    </TableCell>
                    <TableCell align='left'>{row.class}</TableCell>
                    <TableCell align='left'>{row.email}</TableCell>
                    <TableCell align='left'>{row.phoneNumber}</TableCell>
                    <TableCell align='left'>{row.term}</TableCell>
                    <TableCell
                      align='left'
                      style={{
                        color:
                          row.status === 'Chưa thực tập'
                            ? red[500]
                            : row.status === 'Đang thực tập'
                            ? blue[500]
                            : green['A400'],
                      }}
                    >
                      {row.status}
                    </TableCell>
                    <TableCell align='center'>{row.internshipFinalGrade}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NoData />
      )}

      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle>{t('Unaccept student')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('Unaccept student content')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleCloseAlert}
            disabled={loading}
          >
            {t('Close')}
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleRejectStudent}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : t('Accept')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={thirdgradeForm} onClose={handleCloseThirdgradeForm} maxWidth='xs' fullWidth>
        <DialogTitle>{t('Third grade')}</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label={t('Third grade')}
                  fullWidth
                  type='number'
                  {...register('internshipThirdGrade')}
                  error={Boolean(errors.internshipThirdGrade)}
                  helperText={t(
                    `${
                      errors.internshipThirdGrade?.message
                        ? errors.internshipThirdGrade?.message
                        : ''
                    }`
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type='button'
                  variant='outlined'
                  color='secondary'
                  disabled={loadingThirdGrade}
                  onClick={handleCloseThirdgradeForm}
                >
                  {loadingThirdGrade ? <CircularProgress size={24} /> : t('Cancel')}
                </Button>
                <Button
                  type='button'
                  variant='contained'
                  sx={{ ml: 1 }}
                  disabled={loadingThirdGrade}
                  onClick={handleSubmit(onSubmit)}
                >
                  {loadingThirdGrade ? <CircularProgress size={24} /> : t('Update')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default StudentAcceptedTable
