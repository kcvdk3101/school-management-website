import { Paper, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

type TeacherRankProps = {}

function createData(stt: number, name: string, calories: number) {
  return { stt, name, calories }
}

const rows = [
  createData(1, 'Lê Thị Bảo Trân', 42),
  createData(2, 'Đặng Thị Kim Giao', 30),
  createData(3, 'Tôn Quang Toại', 20),
  createData(4, 'Đỗ Đức Bích Ngân', 15),
  createData(5, 'Nguyễn Đức Cường', 10),
  createData(6, 'Nguyễn Đức Cường', 10),
  createData(7, 'Nguyễn Đức Cường', 10),
]

const TeacherRank: React.FC<TeacherRankProps> = () => {
  const { t } = useTranslation()

  return (
    <Paper style={{ padding: 12, height: '100%' }}>
      <Typography>Teacher Rank</Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: grey[800],
                  color: 'white',
                }}
              >
                {t('N.O')}
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: grey[800],
                  color: 'white',
                }}
              >
                {t('Lecturer')}
              </TableCell>
              <TableCell
                align='center'
                style={{
                  backgroundColor: grey[800],
                  color: 'white',
                }}
              >
                {t('Number of students')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell component='th' scope='row'>
                  {row.stt}
                </TableCell>
                <TableCell align='left'>{row.name}</TableCell>
                <TableCell align='center'>{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TeacherRank
