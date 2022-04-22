import React from 'react'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Skeleton from '@mui/material/Skeleton'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'

type SkeletonStudentTableProps = {
  columns: number
}

const SkeletonStudentTable: React.FC<SkeletonStudentTableProps> = ({ columns }) => {
  return (
    <Paper>
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
            {[...Array(10)].map((_, index) => (
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
