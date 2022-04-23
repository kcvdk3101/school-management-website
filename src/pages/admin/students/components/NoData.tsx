import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import React from 'react'

const NoData: React.FC = () => {
  return (
    <Paper
      sx={{
        height: '100%',
      }}
    >
      <TableContainer>
        <Table aria-labelledby='tableTitle' size={'medium'}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Không có dữ liệu</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default NoData
