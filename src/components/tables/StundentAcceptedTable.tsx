import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  CircularProgress,
  Checkbox,
} from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { StudentModel } from '../../models/student.model'

interface StudentAcceptedTableProps {
  // students: StudentModel[]
  // page: number
  // handleChangePage: (event: unknown, newPage: number) => void
  // handleOpenEditStudent: (id: number) => void
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
    label: 'Internship grade',
  },
]

function createData(
  identityNumber: string,
  fullName: string,
  studentClass: string,
  email: string,
  phoneNumber: string,
  term: string,
  status: string,
  internshipFinalGrade: number
) {
  return {
    identityNumber,
    fullName,
    studentClass,
    email,
    phoneNumber,
    term,
    status,
    internshipFinalGrade,
  }
}

const rows = [
  createData(
    '18dh110815',
    'Vương Đình Khôi',
    'PM1804',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Chưa thực tập',
    0
  ),
  createData(
    '18dh110856',
    'Mai Trung Minh Kiên',
    'PM1804',
    '18dh110856@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đang thực tập',
    0
  ),
  createData(
    '18dh110814',
    'Nguyễn Vĩnh Phước',
    'PM1804',
    '18dh110814@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đã thực tập',
    9
  ),
  createData(
    '18dh110810',
    'Phan Tấn Lâm',
    'PM1804',
    '18dh110814@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đã thực tập',
    9
  ),
  createData(
    '18dh110811',
    'Nguyễn Trung Tín',
    'PM1804',
    '18dh110814@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đã thực tập',
    9
  ),
]

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const StudentAcceptedTable: React.FC<StudentAcceptedTableProps> = () => {
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
      const newSelecteds = rows.map((n) => n.identityNumber)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleChangePage = () => {}

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
          // onClick={handleAcceptStudent}
        >
          {loading ? <CircularProgress size={24} /> : `${t('Cancel accept')}`}
        </Button>
      </Box>
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
            {rows.map((row, idx) => {
              const isItemSelected = isSelected(row.identityNumber)

              return (
                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell padding='checkbox' component='th' scope='row'>
                    <Checkbox
                      color='primary'
                      checked={isItemSelected}
                      onClick={(event) => handleClick(event, row.identityNumber)}
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
                  <TableCell align='left'>{row.studentClass}</TableCell>
                  <TableCell align='left'>{row.email}</TableCell>
                  <TableCell align='left'>{row.phoneNumber}</TableCell>
                  <TableCell align='left'>{row.term}</TableCell>
                  <TableCell
                    align='left'
                    style={{
                      color:
                        row.status === 'Chưa thực tập'
                          ? red[500]
                          : row.status === 'Đang thực tập'
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
      <TablePagination
        padding='none'
        rowsPerPageOptions={[10]}
        component='div'
        count={269}
        rowsPerPage={5}
        page={0}
        onPageChange={handleChangePage}
      />
    </Box>
  )
}

export default StudentAcceptedTable
