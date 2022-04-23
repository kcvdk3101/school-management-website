import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
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
  const students = useAppSelector((state) => state.students.students)

  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<string | Blob | FileList | File>()
  const [nameFile, setNameFile] = useState<string>()
  console.log('selectedFile :>> ', selectedFile)

  const handleOnChange = (event: any) => {
    setNameFile(event.target.files[0].name)
    setSelectedFile(event.target.files[0])
  }

  const saveExcelFile = async () => {
    const formData = new FormData()

    formData.append('files', selectedFile as Blob)

    try {
      dispatch(saveStudentsExcelFile(formData))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        dispatch(getStudents())
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    })()
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Students</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <Header title='Students' />

        <Box component='main' className={classes.container}>
          <Toolbar />
          <Box sx={{ mb: 1 }}>
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
            </label>
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
          <StudentTable />

          {/* {isLoading ? (
            <SkeletonStudentTable columns={6} />
          ) : students && students.length > 0 ? (
            <StudentTable />
          ) : (
            <NoData />
          )} */}
        </Box>
      </Box>
    </>
  )
}

export default Students
