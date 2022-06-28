import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { StudentModel } from '../../models/student.model'
import { convertDateString } from '../../utils'
import SummarizeIcon from '@mui/icons-material/Summarize'

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
    id: 'lastName',
    disablePadding: false,
    label: 'Last name',
  },
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First name',
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
    id: 'isRegistered',
    disablePadding: false,
    label: 'Account',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'nameTeacher',
    disablePadding: false,
    label: 'Lecturer',
  },
  {
    id: 'mode',
    disablePadding: false,
    label: 'Action',
  },
]

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  page,
  handleChangePage,
  handleOpenEditStudent,
}) => {
  const { t } = useTranslation()

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
                  <TableCell align='left'>{row.lastName}</TableCell>
                  <TableCell align='left'>{row.firstName}</TableCell>
                  <TableCell align='left'>{row.class}</TableCell>
                  <TableCell align='left'>{convertDateString(row.birthDate as string)}</TableCell>
                  <TableCell align='left'>{row.email}</TableCell>
                  <TableCell align='left'>{row.phoneNumber}</TableCell>
                  <TableCell align='left'>{row.isRegistered ? 'Đã tạo' : 'Chưa tạo'}</TableCell>
                  <TableCell align='left'>{row.status}</TableCell>
                  <TableCell align='left'>
                    {row.nameTeacher === '' ? '-----' : row.nameTeacher}
                  </TableCell>
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
        rowsPerPageOptions={[8]}
        component='div'
        count={totalStudents}
        rowsPerPage={8}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default StudentTable
