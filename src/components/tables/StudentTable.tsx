import EditIcon from '@mui/icons-material/Edit'
import { Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { StudentModel } from '../../models/student.model'
import FilterButton from '../../pages/admin/students/components/FilterButton'
import SearchButton from '../../pages/admin/students/components/SearchButton'
import { convertDateString } from '../../utils'
import EditStudentFormManagement from '../form/student/edit/EditStudentFormManagement'

interface StudentTableProps {
  students: StudentModel[]
  page: number
  handleChangePage: (event: unknown, newPage: number) => void
}

interface RowData extends StudentModel {
  isEditMode?: boolean
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
    label: 'Identity Number',
  },
  {
    id: 'lastName',
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'firstName',
    disablePadding: false,
    label: 'First Name',
  },
  {
    id: 'class',
    disablePadding: false,
    label: 'Class',
  },
  {
    id: 'birthDate',
    disablePadding: false,
    label: 'Birth Date',
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'isEditMode',
    disablePadding: false,
    label: 'Action',
  },
]

const StudentTable: React.FC<StudentTableProps> = ({ students, page, handleChangePage }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [currentId, setCurrentId] = useState<number>(-1)

  const totalStudents = useAppSelector((state) => state.students.pagination.total)

  function handleOpen(id: number) {
    setCurrentId(id)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rowsData.map((n) => n.name)
  //     setSelected(newSelecteds)
  //     return
  //   }
  //   setSelected([])
  // }
  // const handleClick = (event: React.MouseEvent<unknown>, identityNumber: string) => {
  //   const selectedIndex = selected.indexOf(identityNumber)
  //   let newSelected: string[] = []

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, identityNumber)
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1))
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1))
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     )
  //   }

  //   setSelected(newSelected)
  // }

  // const isSelected = (name: any) => selected.indexOf(name) !== -1

  return (
    <Paper>
      <Toolbar>
        <FilterButton />
        <SearchButton />
      </Toolbar>
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
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row, index) => {
              // const isItemSelected = isSelected(row.identityNumber)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  key={index}
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  // selected={isItemSelected}
                  // onClick={(event: any) => handleClick(event, row.identityNumber)}
                >
                  <TableCell
                    component='th'
                    id={labelId}
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
                  <TableCell align='left'>{row.status}</TableCell>
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
        count={totalStudents}
        rowsPerPage={8}
        page={page}
        onPageChange={handleChangePage}
      />
      <Modal open={open} onClose={handleClose}>
        <EditStudentFormManagement
          student={students[currentId]}
          handleClose={handleClose}
          page={page}
        />
      </Modal>
    </Paper>
  )
}

export default StudentTable
