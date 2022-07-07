import { LinearProgress, Paper, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useState, useEffect } from 'react'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'
import teachersApi from '../../../../api/university/teachersApi'
import { TeacherModel } from '../../../../models/teacher.model'
import { toast } from 'react-toastify'

type TeacherRankProps = {}

// function createData(stt: number, name: string, calories: number) {
//   return { stt, name, calories }
// }

// const rows = [
//   createData(1, 'Lê Thị Bảo Trân', 42),
//   createData(2, 'Đặng Thị Kim Giao', 30),
//   createData(3, 'Tôn Quang Toại', 20),
//   createData(4, 'Đỗ Đức Bích Ngân', 15),
//   createData(5, 'Nguyễn Đức Cường', 10),
//   createData(6, 'Nguyễn Đức Cường', 10),
//   createData(7, 'Nguyễn Đức Cường', 10),
// ]

const TeacherRank: React.FC<TeacherRankProps> = () => {
  const { t } = useTranslation()
  const date = new Date()
  let year = date.getFullYear()

  const [teachers, setTeachers] = useState<TeacherModel[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await teachersApi.getAllTeachersNoPagination(year)
        if (response.data.length > 0) {
          let firstSevenEle = response.data.splice(0, 7)
          setTeachers(firstSevenEle)
        } else {
          toast.error('Cannot load data teacher')
        }
      } catch (error) {
        toast.error('Cannot load data teacher')
      } finally {
        setLoading(false)
      }
    })()
  }, [year])

  return (
    <Paper style={{ padding: 12, height: '100%' }}>
      <Typography style={{ marginBottom: 4 }}>{t('Table ranking')}</Typography>
      {loading ? (
        <LinearProgress color='secondary' />
      ) : (
        <>
          {teachers && teachers.length > 0 && (
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
                  {teachers.map((teacher, idx) => (
                    <TableRow key={idx}>
                      <TableCell component='th' scope='row'>
                        {idx + 1}
                      </TableCell>
                      <TableCell align='left'>{teacher.fullName}</TableCell>
                      <TableCell align='center'>{teacher.studentAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Paper>
  )
}

export default TeacherRank
