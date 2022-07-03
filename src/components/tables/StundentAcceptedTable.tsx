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
    id: 'internshipGrade',
    label: 'Internship grade',
  },
]

function createData(
  fullName: string,
  studentClass: string,
  email: string,
  phoneNumber: string,
  term: string,
  status: string,
  internshipGrade: number
) {
  return { fullName, studentClass, email, phoneNumber, term, status, internshipGrade }
}

const rows = [
  createData(
    'Vương Đình Khôi',
    'PM1804',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Chưa thực tập',
    0
  ),
  createData(
    'Vương Đình Khôi',
    'PM1804',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đang thực tập',
    0
  ),
  createData(
    'Vương Đình Khôi',
    'PM1804',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đã thực tập',
    9
  ),
  createData(
    'Vương Đình Khôi',
    'PM1804',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đã thực tập',
    9
  ),
  createData(
    'Vương Đình Khôi',
    'PM1804',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'K24',
    'Đã thực tập',
    9
  ),
  createData(
    'Vương Đình Khôi',
    'PM1804',
    '18dh110815@st.huflit.edu.vn',
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
          {loading ? <CircularProgress size={24} /> : `${t('Cancel')}`}
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
            {rows.map((row, idx) => (
              <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                <TableCell align='left'>{row.internshipGrade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        padding='none'
        rowsPerPageOptions={[10]}
        component='div'
        count={totalStudents}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      /> */}
    </Box>
  )
}

export default StudentAcceptedTable
