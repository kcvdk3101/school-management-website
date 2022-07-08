import EditIcon from '@mui/icons-material/Edit'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
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
  handleOpenProfile: (id: number) => void
}
interface HeadCell {
  id: keyof StudentModel
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
    id: 'internshipFinalGrade',
    label: 'Final grade',
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
  handleOpenProfile,
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
                }}
              >
                <TableCell
                  align='center'
                  style={{
                    backgroundColor: grey[800],
                    color: 'white',
                  }}
                >
                  {t('Action')}
                </TableCell>
                <TableCell
                  align='center'
                  style={{
                    backgroundColor: grey[800],
                    color: 'white',
                  }}
                >
                  {t('Profile')}
                </TableCell>
                <TableCell
                  align='center'
                  style={{
                    backgroundColor: grey[800],
                    color: 'white',
                  }}
                >
                  {t('Identity number')}
                </TableCell>
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
                <TableRow key={index} hover>
                  <TableCell className={classes.sticky} size='small' align='left'>
                    <TableCell align='center' size='small'>
                      <Tooltip title={`${t('Edit')}`} placement='top'>
                        <IconButton onClick={() => handleOpenEditStudent(index)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align='center' size='small'>
                      <Tooltip title={`${t('Profile sheet')}`} placement='top'>
                        <IconButton onClick={() => handleOpenProfile(index)}>
                          <FormatListBulletedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align='center' size='small'>
                      {row.identityNumber}
                    </TableCell>
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
                    {row.internshipFinalGrade}
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
