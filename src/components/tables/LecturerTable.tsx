import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { LecturerModel } from '../../models/lecturer.model'
import { convertDateString } from '../../utils'
import EditStudentFormManagement from '../form/student/edit/EditStudentFormManagement'

interface LecturerTableProps {
  lecturers: LecturerModel[]
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
}

interface RowData extends LecturerModel {
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

const LecturerTable: React.FC<LecturerTableProps> = ({ lecturers, page, handleChangePage }) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [currentId, setCurrentId] = useState<number>(-1)

  const totalLecturers = useAppSelector((state) => state.lecturers.pagination.total)

  function handleOpen(id: number) {
    setCurrentId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

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
                    <IconButton aria-label='edit' onClick={() => handleOpen(index)}>
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
      {/* <Modal open={open} onClose={handleClose}>
        <EditStudentFormManagement
          student={lecturers[currentId]}
          handleClose={handleClose}
          page={page}
        />
      </Modal> */}
    </>
  )
}

export default LecturerTable
