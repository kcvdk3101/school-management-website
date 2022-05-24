import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, Button, Toolbar, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import FilterButton from '../students/components/FilterButton'
import SearchButton from './components/SearchButton'
import queryString from 'query-string'

type LecturersProps = {}

const Input = styled('input')({
  display: 'none',
})

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
})

const Lecturers: React.FC<LecturersProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  let navigate = useNavigate()
  let { search } = useLocation()

  let paginationQuery = queryString.parse(search)
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''

  const dispatch = useAppDispatch()
  const { fetchingStudent, students } = useAppSelector((state) => state.students)

  const [selectedFile, setSelectedFile] = useState<string | Blob | FileList | File>()
  const [nameFile, setNameFile] = useState<string>()
  const [selectedName, setSelectedName] = useState<string>('')

  const [page, setPage] = useState(0)
  const [openNewTeacher, setOpenNewTeacher] = useState(false)

  useEffect(() => {
    // ;(async () => {
    //   try {
    //     if (status || selectedName) {
    //       return await dispatch(getStudentsByFilter({ offset, status, fullName: selectedName }))
    //     }
    //     await dispatch(getStudents(offset))
    //   } catch (error) {
    //     console.log(error)
    //   }
    // })()
  }, [dispatch, selectedName, offset, status])

  const handleOnChange = (event: any) => {
    setNameFile(event.target.files[0].name)
    setSelectedFile(event.target.files[0])
  }

  const handleOpenNewTeacher = () => {
    setOpenNewTeacher(true)
  }

  function handleCloseNewTeacher() {
    setOpenNewTeacher(false)
  }

  const handleChangeSelectedName = (value: string) => {
    setSelectedName(value)
  }

  const saveExcelFile = async () => {
    const formData = new FormData()
    formData.append('files', selectedFile as Blob)

    // try {
    //   const response = await dispatch(saveStudentsExcelFile(formData))
    //   if (response.meta.requestStatus === 'fulfilled') {
    //     ;(async () => {
    //       try {
    //         await dispatch(getStudents(0))
    //       } catch (error) {
    //         console.log(error)
    //       }
    //     })()
    //   } else {
    //     console.log('Error')
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  // const handleChangePage = async (event: unknown, newPage: number) => {
  //   setPage(newPage)
  //   try {
  //     if (status || fullName) {
  //       await dispatch(getStudentsByFilter({ offset: newPage, status, fullName }))
  //     } else {
  //       await dispatch(getStudents(newPage))
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     navigate({
  //       pathname: '/admin/students',
  //       search: `?limit=8&offset=${newPage}&status=${status}&fullName=${fullName}`,
  //     })
  //   }
  // }

  return (
    <>
      <Helmet>
        <title>{t('Lecturer')}</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Header title='Lecturer' />
        <Box component='main' className={classes.container}>
          <Toolbar />
          <Box component='div' className={classes.innerContainer}>
            <Box component='div'>
              <label htmlFor='button-file'>
                <Input
                  accept='*.xlsx'
                  id='button-file'
                  multiple
                  type='file'
                  // onChange={handleOnChange}
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
                // disabled={selectedFile === undefined}
                // onClick={saveExcelFile}
              >
                <SaveIcon />
              </Button>
              {/* {selectedFile && nameFile && (
                <Typography
                  component='span'
                  sx={{
                    ml: 1,
                    textAlign: 'center',
                  }}
                >
                  {nameFile}
                </Typography>
              )} */}
            </Box>
            {/* <Box component='div'>
              <Button
                variant='contained'
                color='secondary'
                type='button'
                onClick={handleOpenNewStudent}
              >
                {t('Add new')}
              </Button>
            </Box> */}
          </Box>

          <Paper sx={{ p: 1, height: 'auto' }}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <SearchButton handleChangeSelectedName={handleChangeSelectedName} setPage={setPage} />
              <FilterButton setPage={setPage} />
            </Box>
            {/* {fetchingStudent ? (
              // <SkeletonStudentTable columns={6} />
            ) : students.length === 0 ? (
              <NoData />
            ) : (
              <StudentTable page={page} students={students} handleChangePage={handleChangePage} />
            )} */}
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default Lecturers