import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Dialog, DialogContent, DialogTitle, Button, Typography, Box } from '@mui/material'
import { grey, red } from '@mui/material/colors'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { TeacherModel } from '../../models/teacher.model'
import ListStudents from '../../pages/admin/teachers/components/ListStudents'
import { StudentModel } from '../../models/student.model'

interface TeacherTableProps {
  teachers: TeacherModel[]
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleOpenEditTeacher: (id: number) => void
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
    id: 'maximumStudentAmount',
    disablePadding: false,
    label: 'Maximum number of students',
  },
  {
    id: 'studentAmount',
    disablePadding: false,
    label: 'Current number of students',
  },
  {
    id: 'students',
    disablePadding: false,
    label: 'List students',
  },
  {
    id: 'isEditMode',
    disablePadding: false,
    label: 'Action',
  },
]

const TeacherTable: React.FC<TeacherTableProps> = ({
  teachers,
  page,
  handleChangePage,
  handleOpenEditTeacher,
}) => {
  const { t } = useTranslation()

  const totalLecturers = useAppSelector((state) => state.teachers.pagination.total)

  const [openListStudents, setOpenListStudents] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleOpenListStudents = (idx: number) => {
    setCurrentIndex(idx)
    setOpenListStudents(true)
  }
  const handleCloseListStudents = () => {
    setOpenListStudents(false)
  }

  return (
    <>
      <TableContainer>
        <Table
          aria-labelledby='tableTitle'
          size={'medium'}
          stickyHeader
          sx={{
            width: 'max-content',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align='left'
                size='small'
                style={{
                  backgroundColor: grey[800],
                  color: 'white',
                }}
              >
                {t('N.O')}
              </TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align='left'
                  sx={{
                    py: 1,
                  }}
                  style={{
                    backgroundColor: grey[800],
                    color: 'white',
                  }}
                >
                  {t(`${headCell.label}`)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((row, index) => {
              return (
                <TableRow key={index} hover role='checkbox' tabIndex={-1}>
                  <TableCell align='center' size='small'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='left'>{row.lastName}</TableCell>
                  <TableCell align='left'>{row.firstName}</TableCell>
                  <TableCell align='left'>{row.position}</TableCell>
                  <TableCell align='left'>{row.department}</TableCell>
                  <TableCell align='left'>{row.email}</TableCell>
                  <TableCell align='left'>{row.phoneNumber}</TableCell>
                  <TableCell align='center'>{row.maximumStudentAmount}</TableCell>
                  <TableCell
                    align='center'
                    style={{ color: row.studentAmount === 0 ? red[500] : grey[900] }}
                  >
                    {row.studentAmount}
                  </TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      py: 1,
                    }}
                  >
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => handleOpenListStudents(index)}
                    >
                      <Typography variant='body2'>{t('See details')}</Typography>
                    </Button>
                  </TableCell>
                  <TableCell
                    align='left'
                    sx={{
                      py: 1,
                    }}
                  >
                    <IconButton aria-label='edit' onClick={() => handleOpenEditTeacher(index)}>
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

      {/* List student of specific teacher */}
      <Dialog open={openListStudents} onClose={handleCloseListStudents} maxWidth='md' fullWidth>
        <DialogTitle>{t('List students')}</DialogTitle>
        <DialogContent>
          {teachers[currentIndex].students ? (
            <ListStudents students={teachers[currentIndex]?.students as StudentModel[]} />
          ) : (
            <Box>
              <Typography>{t('No data')}</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TeacherTable
