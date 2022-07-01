import EditIcon from '@mui/icons-material/Edit'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { green, red, blue } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { StudentModel } from '../../models/student.model'
import { convertDateString } from '../../utils'

interface StudentTableProps {
  students: StudentModel[]
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleOpenEditStudent: (id: number) => void
}

interface RowData extends StudentModel {
  mode?: boolean
}

interface HeadCell {
  id: keyof RowData
  disablePadding: boolean
  label: string
}

const headCells: HeadCell[] = [
  {
    id: 'identityNumber',
    disablePadding: true,
    label: 'Identity number',
  },
  {
    id: 'fullName',
    disablePadding: false,
    label: 'Full name',
  },
  {
    id: 'class',
    disablePadding: false,
    label: 'Class',
  },
  {
    id: 'birthDate',
    disablePadding: false,
    label: 'Birthday',
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'address',
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'term',
    disablePadding: false,
    label: 'Term',
  },
  {
    id: 'cv',
    disablePadding: false,
    label: 'Number of CVs',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Internship status',
  },
  {
    id: 'nameTeacher',
    disablePadding: false,
    label: 'Lecturer',
  },
  {
    id: 'internshipGrade',
    disablePadding: false,
    label: 'Internship grade',
  },
  {
    id: 'mode',
    disablePadding: false,
    label: 'Action',
  },
]

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  sticky: {
    position: 'sticky',
    left: 0,
    background: 'white',
    boxShadow: '8px 5px 10px grey',
  },
})

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  page,
  handleChangePage,
  handleOpenEditStudent,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const totalStudents = useAppSelector((state) => state.students.pagination.total)

  return (
    <>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size={'medium'} stickyHeader>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align='left'
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
            {students.map((row, index) => {
              return (
                <TableRow key={index} hover role='checkbox' tabIndex={-1}>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{
                      py: 1,
                    }}
                  >
                    {row.identityNumber}
                  </TableCell>
                  <TableCell align='left'>{row.fullName}</TableCell>
                  <TableCell align='left'>{row.class}</TableCell>
                  <TableCell align='left'>{convertDateString(row.birthDate as string)}</TableCell>
                  <TableCell align='left'>{row.email}</TableCell>
                  <TableCell align='left'>{row.phoneNumber}</TableCell>
                  <TableCell align='left'>{row.address}</TableCell>
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
                  <TableCell
                    align='left'
                    style={{ color: row.nameTeacher === '' ? red[500] : green['A400'] }}
                  >
                    {row.nameTeacher === '' ? 'Chưa có' : row.nameTeacher}
                  </TableCell>
                  <TableCell align='center'>
                    {row.cv && row.cv.length > 0 ? row.cv.length : 0}
                  </TableCell>
                  <TableCell align='center'>{row.internshipGrade}</TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      py: 1,
                    }}
                  >
                    <IconButton aria-label='edit' onClick={() => {}}>
                      <SummarizeIcon />
                    </IconButton>
                    <IconButton aria-label='edit' onClick={() => handleOpenEditStudent(index)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
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
        count={totalStudents}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default StudentTable
