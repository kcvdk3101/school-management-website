import DoneIcon from '@mui/icons-material/Done'
import EditIcon from '@mui/icons-material/Edit'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { makeStyles } from '@mui/styles'
import { visuallyHidden } from '@mui/utils'
import React, { useState } from 'react'
import { Order } from '../../constants'
import { StudentModel } from '../../models/student.model'

interface StudentTableProps {
  students: StudentModel[]
}

interface RowData extends StudentModel {
  isEditMode?: boolean
}

interface HeadCell {
  id: keyof RowData
  disablePadding: boolean
  label: string
}

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof StudentModel) => void
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

interface EnhancedTableCellProps {
  row: RowData | any
  inputName: string
  // onChange: (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   row: RowData | any
  // ) => void
}

const useStyles = makeStyles({
  input: {
    width: '100%',
    height: 20,
  },
})

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean | undefined },
  b: { [key in Key]: number | string | boolean | undefined }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
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
    id: 'address',
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'isEditMode',
    disablePadding: false,
    label: 'Action',
  },
]

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              py: 1,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function EnhancedTableCell(props: EnhancedTableCellProps) {
  const { row, inputName } = props
  const { isEditMode } = row
  const classes = useStyles()

  return (
    <TableCell
      align='left'
      sx={{
        py: 1,
      }}
    >
      {isEditMode ? (
        <Input
          type='text'
          className={classes.input}
          value={row[inputName]}
          name={inputName}
          // onChange={(e) => onChange(e, row)}
        />
      ) : (
        row[inputName]
      )}
    </TableCell>
  )
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof RowData>('firstName')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(8)
  const [rowsData, setRowsData] = useState<any[]>(students)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof StudentModel) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

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
  //   let newSelected: readonly string[] = []

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>, row: RowData | any) => {
    // if (!previous[row.id]) {
    //   setPrevious((state) => ({ ...state, [row.id]: row }))
    // }
    const value = e.target.value
    const name = e.target.name
    const { id } = row
    const newRows = rowsData.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value }
      }
      return row
    })
    setRowsData(newRows)
  }

  const onToggleEditMode = (id: string) => {
    setRowsData((state) => {
      return rowsData.map((row) => {
        if (row.identityNumber === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
    })
  }

  // const isSelected = (name: string | number | boolean | undefined) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0

  return (
    <Paper>
      <TableContainer>
        <Table aria-labelledby='tableTitle' size={'medium'}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            // onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rowsData.length}
          />
          <TableBody>
            {stableSort(rowsData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                // const isItemSelected = isSelected(row.identityNumber)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    key={index}
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    // aria-checked={isItemSelected}
                    // selected={isItemSelected}
                    // onClick={(event:any) => handleClick(event, row.identityNumber)}
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
                    <EnhancedTableCell {...{ row, inputName: 'lastName' }} />
                    <EnhancedTableCell {...{ row, inputName: 'firstName' }} />
                    <EnhancedTableCell {...{ row, inputName: 'email' }} />
                    <EnhancedTableCell {...{ row, inputName: 'phoneNumber' }} />
                    <EnhancedTableCell {...{ row, inputName: 'address' }} />
                    <TableCell
                      align='left'
                      sx={{
                        py: 1,
                      }}
                    >
                      {row.isEditMode ? (
                        <>
                          <IconButton aria-label='done'>
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            aria-label='cancel'
                            onClick={() => onToggleEditMode(row.identityNumber as string)}
                          >
                            <NotInterestedIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          aria-label='edit'
                          onClick={() => onToggleEditMode(row.identityNumber as string)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                sx={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        padding='none'
        rowsPerPageOptions={[8]}
        component='div'
        count={rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default StudentTable
