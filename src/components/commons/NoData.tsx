import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NoData: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Box style={{ width: '100%' }}>
      <TableContainer>
        <Table
          aria-labelledby='tableTitle'
          size={'medium'}
          sx={{
            width: 'max-content',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>{t('No data')}</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default NoData
