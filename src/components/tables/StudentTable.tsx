import EditIcon from '@mui/icons-material/Edit'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { blue, green, grey, red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
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
    id: 'birthDate',
    label: 'Birthday',
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
    id: 'address',
    label: 'Address',
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
    id: 'nameTeacher',
    label: 'Lecturer',
  },
  {
    id: 'cv',
    label: 'Number of CVs',
  },
  {
    id: 'internshipGrade',
    label: 'Internship grade',
  },
  {
    id: 'mode',
    label: 'Action',
  },
]

const useStyles = makeStyles({
  sticky: {
    zIndex: '900 !important',
    position: 'sticky',
    left: 0,
    backgroundColor: 'white',
    boxShadow: '8px 5px 10px grey',
    paddingTop: 1,
    paddingBottom: 1,
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
    <Box>
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
                className={classes.sticky}
                size='small'
                style={{
                  backgroundColor: grey[800],
                  color: 'white',
                }}
              >
                {t('Identity number')}
              </TableCell>
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
                  size='small'
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
            {students.map((row, index) => {
              return (
                <TableRow key={index} hover role='checkbox' tabIndex={-1}>
                  <TableCell component='th' scope='row' className={classes.sticky} size='small'>
                    {row.identityNumber}
                  </TableCell>
                  <TableCell align='center' size='small'>
                    {index + 1}
                  </TableCell>
                  <TableCell align='left' size='small'>
                    {row.fullName}
                  </TableCell>
                  <TableCell align='left' size='small'>
                    {row.class}
                  </TableCell>
                  <TableCell align='left' size='small'>
                    {convertDateString(row.birthDate as string)}
                  </TableCell>
                  <TableCell align='left' size='small'>
                    {row.email}
                  </TableCell>
                  <TableCell align='left' size='small'>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell align='left' size='small'>
                    {row.address}
                  </TableCell>
                  <TableCell align='left' size='small'>
                    {row.term}
                  </TableCell>
                  <TableCell
                    align='left'
                    size='small'
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
                    size='small'
                    style={{ color: row.nameTeacher === '' ? red[500] : green['A400'] }}
                  >
                    {row.nameTeacher === '' ? 'Chưa có' : row.nameTeacher}
                  </TableCell>
                  <TableCell align='center' size='small'>
                    {row.cv && row.cv.length > 0 ? row.cv.length : 0}
                  </TableCell>
                  <TableCell align='center' size='small'>
                    {row.internshipGrade}
                  </TableCell>
                  <TableCell
                    align='left'
                    size='small'
                    sx={{
                      py: 1,
                    }}
                  >
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
    </Box>
  )
}

export default StudentTable
