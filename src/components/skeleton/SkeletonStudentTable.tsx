import Skeleton from '@mui/material/Skeleton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'

type SkeletonStudentTableProps = {
  columns: number
}
const SkeletonStudentTable: React.FC<SkeletonStudentTableProps> = ({ columns }) => {
  return (
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
  )
}

export default SkeletonStudentTable
