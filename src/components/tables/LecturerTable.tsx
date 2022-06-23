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
import { TeacherModel } from '../../models/teacher.model'

interface LecturerTableProps {
  lecturers: TeacherModel[]
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleOpenEditLecturer: (id: number) => void
}

interface RowData extends TeacherModel {
  isEditMode?: boolean
}

interface HeadCell {
  id: keyof RowData
  disablePadding: boolean
  label: string
}

const headCells: HeadCell[] = [
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
    id: 'position',
    disablePadding: false,
    label: 'Position',
  },
  {
    id: 'department',
    disablePadding: false,
    label: 'Department',
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
    id: 'isEditMode',
    disablePadding: false,
    label: 'Action',
  },
]

const LecturerTable: React.FC<LecturerTableProps> = ({
  lecturers,
  page,
  handleChangePage,
  handleOpenEditLecturer,
}) => {
  const { t } = useTranslation()

  const totalLecturers = useAppSelector((state) => state.teachers.pagination.total)

  return (
    <>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size={'medium'}>
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
            {lecturers.map((row, index) => {
              return (
                <TableRow key={index} hover role='checkbox' tabIndex={-1}>
                  <TableCell align='left'>{row.lastName}</TableCell>
                  <TableCell align='left'>{row.firstName}</TableCell>
                  <TableCell align='left'>{row.position}</TableCell>
                  <TableCell align='left'>{row.department}</TableCell>
                  <TableCell align='left'>{row.email}</TableCell>
                  <TableCell align='left'>{row.phoneNumber}</TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      py: 1,
                    }}
                  >
                    <IconButton aria-label='edit' onClick={() => handleOpenEditLecturer(index)}>
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
        count={totalLecturers}
        rowsPerPage={8}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default LecturerTable
