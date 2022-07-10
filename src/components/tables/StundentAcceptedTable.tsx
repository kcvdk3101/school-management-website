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
} from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StudentModel } from '../../models/student.model'
import NoData from '../commons/NoData'

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

const StudentAcceptedTable: React.FC<StudentAcceptedTableProps> = ({ listStudentAccepted }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const [selected, setSelected] = useState<readonly string[]>([])
  const [loading, setLoading] = useState(false)

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
    // try {
    //   let teacher = selected.map((id) => ({
    //     studentId: id,
    //     teacherId: user.teacherId as string,
    //   }))
    //   const response = await dispatch(acceptedStudent(teacher))
    //   if (response.meta.requestStatus === 'fulfilled') {
    //     setLoading(false)
    //     toast.success('Accepted successfully')
    //   }
    // } catch (error) {
    //   toast.error(error as any)
    // } finally {
    //   setLoading(false)
    // }
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
          disabled={loading || selected.length === 0}
          // onClick={handleRejectStudent}
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
                  {t('N.O')}
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
                      {idx + 1}
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
                    <TableCell align='left'>{row.internshipFinalGrade}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NoData />
      )}
    </Box>
  )
}

export default StudentAcceptedTable
