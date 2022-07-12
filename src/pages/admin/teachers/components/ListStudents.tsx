import { Box, Paper, Tab, Tabs } from '@mui/material'
import { blue, green, red } from '@mui/material/colors'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NoData from '../../../../components/commons/NoData'
import { StudentModel } from '../../../../models/student.model'

type ListStudentsProp = {
  students: StudentModel[]
  studentWaitingAccepteds: StudentModel[]
}

type StudentTableProp = {
  students: StudentModel[]
}

interface HeadCell {
  id: keyof StudentModel
  label: string
}

const headCells: HeadCell[] = [
  {
    id: 'identityNumber',
    label: 'Identity number',
  },
  {
    id: 'fullName',
    label: 'Full name',
  },
  {
    id: 'class',
    label: 'Class',
  },
  {
    id: 'specialization',
    label: 'Specialization',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    label: 'Phone',
  },
  {
    id: 'term',
    label: 'Term',
  },
  {
    id: 'status',
    label: 'Internship status',
  },
]

const StudentTable: React.FC<StudentTableProp> = ({ students }) => {
  const { t } = useTranslation()
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: 'max-content',
        }}
        aria-labelledby='tableTitle'
        size={'medium'}
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell align='left' size='small'>
              {t('N.O')}
            </TableCell>
            {headCells.map((headCell, idx) => (
              <TableCell
                key={idx}
                align='left'
                size='small'
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
          {students.map((row, idx) => {
            return (
              <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' size='small'>
                  {idx + 1}
                </TableCell>
                <TableCell align='left' size='small'>
                  {row.identityNumber}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.fullName}
                </TableCell>
                <TableCell align='left'>{row.class}</TableCell>
                <TableCell align='left'>{row.specialization}</TableCell>
                <TableCell align='left'>{row.email}</TableCell>
                <TableCell align='left'>{row.phoneNumber}</TableCell>
                <TableCell align='left'>{row.term}</TableCell>
                <TableCell
                  align='left'
                  style={{
                    color:
                      row.status === 'Chưa thực tập'
                        ? red[500]
                        : row.status === 'Đang thực tập'
                        ? blue[500]
                        : green['A400'],
                  }}
                >
                  {row.status}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const ListStudents: React.FC<ListStudentsProp> = ({ students, studentWaitingAccepteds }) => {
  const { t } = useTranslation()

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ my: 1 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label={`${t('Accepted')} (${students && students.length > 0 ? students.length : 0})`}
          />
          <Tab
            label={`${t('Not accepted yet')} (${
              studentWaitingAccepteds && studentWaitingAccepteds.length > 0
                ? studentWaitingAccepteds.length
                : 0
            })`}
          />
        </Tabs>
      </Box>

      {value === 0 ? (
        <>{students.length > 0 ? <StudentTable students={students} /> : <NoData />}</>
      ) : (
        <>
          {studentWaitingAccepteds.length > 0 ? (
            <StudentTable students={studentWaitingAccepteds} />
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  )
}

export default ListStudents
