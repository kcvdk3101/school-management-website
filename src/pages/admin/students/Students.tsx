import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {
  Box,
  Button,
  Toolbar,
  Typography,
  CircularProgress,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Grid,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import studentsApi from '../../../api/university/studentsApi'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import NoData from '../../../components/commons/NoData'
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
  tableContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  const term = paginationQuery.term ? (paginationQuery.term as string) : ''

  const dispatch = useAppDispatch()
  const { fetchingStudent, students } = useAppSelector((state) => state.students)

  const [selectedFile, setSelectedFile] = useState<string | Blob | FileList | File>()
  const [nameFile, setNameFile] = useState<string>()
  const [selectedName, setSelectedName] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingGenerate, setLoadingGenerate] = useState(false)

  const [page, setPage] = useState(0)
  const [currentId, setCurrentId] = useState<number>(-1)

  const [openEditStudent, setOpenEditStudent] = useState(false)
  const [openNewStudent, setOpenNewStudent] = useState(false)
  const [openGenerate, setOpenGenerate] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        if (status || selectedName) {
          return await dispatch(
            getStudentsByFilter({ offset, status, fullName: selectedName, term })
          )
        }
        await dispatch(getStudents(offset))
      } catch (error) {
        toast.error('Cannot load student data')
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

  const handleOpenGenerate = () => {
    setOpenGenerate(true)
  }

  const handleCloseGenerate = () => {
    setOpenGenerate(false)
  }

  const handleChangeSelectedName = (value: string) => {
    setSelectedName(value)
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    try {
      if (status || fullName) {
        await dispatch(getStudentsByFilter({ offset: newPage, status, fullName, term }))
      } else {
        await dispatch(getStudents(newPage))
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate({
        pathname: '/admin/students',
        search: `?limit=10&offset=${newPage}&status=${status}&fullName=${fullName}`,
      })
    }
  }

  const saveExcelFile = async () => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('files', selectedFile as Blob)
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

  const generateAccount = async () => {
    setLoadingGenerate(true)
    try {
      const response = await studentsApi.generateStudentAccount()
      if (response.students.length === 0) {
        toast.warning('All accounts have been created')
        setLoadingGenerate(false)
      }
    } catch (error) {
      toast.error('Something wrong!')
    } finally {
      setLoadingGenerate(false)
      handleCloseGenerate()
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
                  disabled={isLoading}
                  onChange={handleOnChange}
                />
                <Button variant='contained' color='secondary' component='span' disabled={isLoading}>
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
                color='primary'
                type='button'
                onClick={handleOpenGenerate}
                sx={{ mr: 2 }}
                disabled={isLoading}
              >
                {t('Generate Account')}
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                type='button'
                onClick={handleOpenNewStudent}
                disabled={isLoading}
              >
                {t('Add new student')}
              </Button>
            </Box>
          </Box>

          <Box component='div' className={classes.innerContainer}>
            <Grid container spacing={1}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid item key={index}>
                  <Chip color='warning' label='Chưa thực tập (150)' />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Paper sx={{ p: 1, height: 'auto' }}>
            <Box className={classes.tableContainer}>
              <Box>
                <SearchButton
                  handleChangeSelectedName={handleChangeSelectedName}
                  setPage={setPage}
                />
              </Box>
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
          student={students[currentId]}
          handleClose={handleCloseEditStudent}
        />
      </Modal>

      <Dialog open={openGenerate}>
        <DialogTitle>{t('Create account heading')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('Create account content')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGenerate} disabled={loadingGenerate}>
            {t('Cancel')}
          </Button>
          <Button onClick={generateAccount} autoFocus disabled={loadingGenerate}>
            {loadingGenerate ? <CircularProgress size={20} /> : t('Create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Student Form */}
      <NewStudentFormManagement open={openNewStudent} handleClose={() => handleCloseNewStudent()} />
    </>
  )
}

export default Students
