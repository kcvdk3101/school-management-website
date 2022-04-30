import React from 'react'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Skeleton from '@mui/material/Skeleton'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Toolbar from '@mui/material/Toolbar'
import FilterListIcon from '@mui/icons-material/FilterList'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

type SkeletonStudentTableProps = {
  columns: number
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const SkeletonStudentTable: React.FC<SkeletonStudentTableProps> = ({ columns }) => {
  return (
    <Paper>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='open drawer'
          sx={{ mr: 2 }}
        >
          <FilterListIcon />
        </IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder='Search…' />
        </Search>
      </Toolbar>
      <TableContainer>
        <Table size={'medium'}>
          <TableHead>
            <TableRow>
              {[...Array(columns)].map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant='text' width='100%' />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(9)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(columns)].map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton key={index} variant='text' width='100%' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default SkeletonStudentTable
