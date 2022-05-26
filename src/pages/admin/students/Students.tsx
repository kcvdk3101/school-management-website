import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, Button, Toolbar, Typography, CircularProgress, Modal } from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import EditStudentFormManagement from '../../../components/form/student/edit/EditStudentFormManagement'
import NewStudentFormManagement from '../../../components/form/student/new/NewStudentFormManagement'
import SkeletonStudentTable from '../../../components/skeleton/SkeletonStudentTable'
import StudentTable from '../../../components/tables/StudentTable'
import {
  getStudents,
  getStudentsByFilter,
  saveStudentsExcelFile,
} from '../../../features/student/studentsSlice'
import FilterButton from './components/FilterButton'
import NoData from './components/NoData'
import SearchButton from './components/SearchButton'

type StudentsProps = {}

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
    marginBottom: 12,
  },
})

const Input = styled('input')({
  display: 'none',
})

const Students: React.FC<StudentsProps> = () => {
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [openEditStudent, setOpenEditStudent] = useState(false)
  const [openNewStudent, setOpenNewStudent] = useState(false)
  const [currentId, setCurrentId] = useState<number>(-1)

  useEffect(() => {
    ;(async () => {
      try {
        if (status || selectedName) {
          return await dispatch(getStudentsByFilter({ offset, status, fullName: selectedName }))
        }

        await dispatch(getStudents(offset))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch, selectedName, offset, status])

  const handleOnChange = (event: any) => {
    setNameFile(event.target.files[0].name)
    setSelectedFile(event.target.files[0])
  }

  function handleOpenEditStudent(id: number) {
    setCurrentId(id)
    setOpenEditStudent(true)
  }

  const handleCloseEditStudent = () => {
    setOpenEditStudent(false)
  }

  const handleOpenNewStudent = () => {
    setOpenNewStudent(true)
  }

  function handleCloseNewStudent() {
    setOpenNewStudent(false)
  }

  const handleChangeSelectedName = (value: string) => {
    setSelectedName(value)
  }

  const saveExcelFile = async () => {
    const formData = new FormData()
    formData.append('files', selectedFile as Blob)
    setIsLoading(true)
    try {
      const response = await dispatch(saveStudentsExcelFile(formData))
      if (response.meta.requestStatus === 'fulfilled') {
        ;(async () => {
          try {
            await dispatch(getStudents(0))
            setSelectedFile(undefined)
            toast.success('Save successfully')
          } catch (error) {
            console.log(error)
          } finally {
            setIsLoading(false)
          }
        })()
      } else {
        toast.error('Something wroing')
      }
    } catch (error) {
      toast.error(error as any)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    try {
      if (status || fullName) {
        await dispatch(getStudentsByFilter({ offset: newPage, status, fullName }))
      } else {
        await dispatch(getStudents(newPage))
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=${newPage}&status=${status}&fullName=${fullName}`,
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('Student')}</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Header title='Student' />

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
                disabled={selectedFile === undefined || isLoading}
                onClick={saveExcelFile}
              >
                {isLoading ? <CircularProgress size={24} /> : <SaveIcon />}
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
                {t('Add new student')}
              </Button>
            </Box>
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
            {fetchingStudent ? (
              <SkeletonStudentTable columns={6} />
            ) : students.length === 0 ? (
              <NoData />
            ) : (
              <StudentTable
                page={page}
                students={students}
                handleChangePage={handleChangePage}
                handleOpenEditStudent={handleOpenEditStudent}
              />
            )}
          </Paper>
        </Box>
      </Box>

      {/* Edit Student Form */}
      <Modal open={openEditStudent} onClose={handleCloseEditStudent}>
        <EditStudentFormManagement
          page={page}
          student={students[currentId]}
          handleClose={handleCloseEditStudent}
        />
      </Modal>

      {/* New Student Form */}
      <NewStudentFormManagement open={openNewStudent} handleClose={() => handleCloseNewStudent()} />
    </>
  )
}

export default Students
