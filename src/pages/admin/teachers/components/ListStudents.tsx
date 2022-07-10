import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { StudentModel } from '../../../../models/student.model'
import { useTranslation } from 'react-i18next'
import { blue, green, red } from '@mui/material/colors'

type ListStudentsProp = {
  students: StudentModel[]
}
interface HeadCell {
  id: keyof StudentModel
  label: string
}

function createData(
  fullName: string,
  studentClass: string,
  term: string,
  email: string,
  phoneNumber: string,
  status: string
) {
  return { fullName, studentClass, term, email, phoneNumber, status }
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
    id: 'term',
    label: 'Term',
  },
  {
    id: 'status',
    label: 'Internship status',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    label: 'Phone',
  },
]

const rows = [
  createData(
    'Vương Đình Khôi',
    'PM1804',
    'K24',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'Chưa thực tập'
  ),
  createData(
    'Vương Đình Khôi',
    'PM1804',
    'K24',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'Đang thực tập'
  ),
  createData(
    'Vương Đình Khôi',
    'PM1804',
    'K24',
    '18dh110815@st.huflit.edu.vn',
    '0934105563',
    'Đã thực tập'
  ),
]

const ListStudents: React.FC<ListStudentsProp> = ({ students }) => {
  const { t } = useTranslation()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
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
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.fullName}
              </TableCell>
              <TableCell align='left'>{row.studentClass}</TableCell>
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
              <TableCell align='left'>{row.email}</TableCell>
              <TableCell align='left'>{row.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListStudents
