import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import NewStudentFormManagement from '../../../components/form/student/new/NewStudentFormManagement'
import SkeletonStudentTable from '../../../components/skeleton/SkeletonStudentTable'
import StudentTable from '../../../components/tables/StudentTable'
import { getStudents, saveStudentsExcelFile } from '../../../features/student/studentsSlice'
import NoData from './components/NoData'

type StudentsProps = {}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px',
  },
})

const Input = styled('input')({
  display: 'none',
})

const Students: React.FC<StudentsProps> = () => {
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const { fetchingStudent, students } = useAppSelector((state) => state.students)

  const [selectedFile, setSelectedFile] = useState<string | Blob | FileList | File>()
  const [nameFile, setNameFile] = useState<string>()
  const [openNewStudent, setOpenNewStudent] = useState(false)
  const [page, setPage] = useState(0)
  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getStudents(page))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch, page])

  const handleOnChange = (event: any) => {
    setNameFile(event.target.files[0].name)
    setSelectedFile(event.target.files[0])
  }

  const handleOpenNewStudent = () => {
    setOpenNewStudent(true)
  }

  const handleCloseNewStudent = () => {
    setOpenNewStudent(false)
  }

  const saveExcelFile = async () => {
    const formData = new FormData()
    formData.append('files', selectedFile as Blob)

    try {
      const response = await dispatch(saveStudentsExcelFile(formData))
      if (response.meta.requestStatus === 'fulfilled') {
        ;(async () => {
          try {
            await dispatch(getStudents(0))
          } catch (error) {
            console.log(error)
          }
        })()
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      <Helmet>
        <title>Students</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Header title='Students' />

        <Box component='main' className={classes.container}>
          <Toolbar />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
            component='div'
          >
            <Box component='div'>
              <label htmlFor='button-file'>
                <Input
                  accept='*.xlsx'
                  id='button-file'
                  multiple
                  type='file'
                  onChange={handleOnChange}
                />
                <Button variant='contained' color='secondary' component='span'>
                  <UploadFileIcon />
                </Button>
              </label>
              <Button
                variant='contained'
                color='info'
                component='span'
                sx={{ ml: 1 }}
                disabled={selectedFile === undefined}
                onClick={saveExcelFile}
              >
                <SaveIcon />
              </Button>
              {selectedFile && nameFile && (
                <Typography
                  component='span'
                  sx={{
                    ml: 1,
                    textAlign: 'center',
                  }}
                >
                  {nameFile}
                </Typography>
              )}
            </Box>
            <Box component='div'>
              <Button
                variant='contained'
                color='secondary'
                type='button'
                onClick={handleOpenNewStudent}
              >
                Add new student
              </Button>
            </Box>
          </Box>
          {fetchingStudent ? (
            <SkeletonStudentTable columns={6} />
          ) : students.length === 0 ? (
            <NoData />
          ) : (
            <StudentTable students={students} handleChangePage={handleChangePage} page={page} />
          )}
        </Box>
      </Box>

      {/* New Student Form */}
      <NewStudentFormManagement open={openNewStudent} handleClose={handleCloseNewStudent} />
    </>
  )
}

export default Students
