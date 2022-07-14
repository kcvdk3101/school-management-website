import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
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
  reportStudent,
  saveStudentsExcelFile,
} from '../../../features/student/studentsSlice'
import ListChipReport from './components/ListChipReport'
import FilterStudent from './components/FilterStudent'
import SearchButton from './components/SearchButton'
import { ReportModel } from '../../../models/report.model'
import StudentNoteManagement from '../../../components/form/student/note/StudentNoteManagement'

type StudentsProps = {}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 72px)',
    padding: '10px',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tableTop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  const academicYear = paginationQuery.academicYear ? +paginationQuery.academicYear : 0
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''
  const term = paginationQuery.term ? (paginationQuery.term as string) : ''
  const nameTeacher = paginationQuery.nameTeacher ? (paginationQuery.nameTeacher as string) : ''
  const specialization = paginationQuery.specialization
    ? (paginationQuery.specialization as string)
    : ''

  const dispatch = useAppDispatch()
  const { fetchingStudent, fetchingReport, students, report } = useAppSelector(
    (state) => state.students
  )

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
  const [openProfile, setOpenProfile] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        if (status || selectedName || term || academicYear || nameTeacher || specialization) {
          console.log('herer')

          await dispatch(
            getStudentsByFilter({
              offset,
              status,
              fullName: selectedName,
              term,
              academicYear,
              nameTeacher,
              specialization,
            })
          )
        } else {
          await dispatch(getStudents({ offset, academicYear }))
        }
      } catch (error) {
        toast.error('Cannot load student data')
      }
    })()
  }, [dispatch, selectedName, offset, status, term, academicYear, nameTeacher, specialization])

  useEffect(() => {
    ;(async () => {
      await dispatch(reportStudent(academicYear))
    })()
  }, [dispatch, academicYear])

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

  function handleOpenProfile(id: number) {
    setCurrentId(id)

    setOpenProfile(true)
  }

  const handleCloseProfile = () => {
    setOpenProfile(false)
  }

  const handleChangeSelectedName = (value: string) => {
    setSelectedName(value)
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    try {
      if (status || fullName) {
        await dispatch(
          getStudentsByFilter({
            offset: newPage,
            status,
            fullName,
            term,
            academicYear,
            nameTeacher,
            specialization,
          })
        )
      } else {
        await dispatch(getStudents({ offset: newPage, academicYear }))
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate({
        pathname: '/admin/students',
        search: `?limit=10&offset=${newPage}&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
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
            await dispatch(reportStudent(academicYear))
            await dispatch(getStudents({ offset: 0, academicYear }))
            setSelectedFile(undefined)
            toast.success(t('Save successfully'))
          } catch (error) {
            console.log(error)
          } finally {
            setIsLoading(false)
          }
        })()
      } else {
        toast.error('Cannot save excel file! Please try again')
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
      const response = await studentsApi.generateStudentAccount(academicYear)
      if (response.status === 200) {
        toast.success(response.message)
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
                sx={{ mr: 2 }}
                variant='contained'
                type='button'
                color='primary'
                disabled={isLoading}
                onClick={handleOpenGenerate}
              >
                {t('Generate student account')}
              </Button>
              <Button
                variant='contained'
                color='secondary'
                type='button'
                onClick={handleOpenNewStudent}
                disabled={isLoading}
              >
                {t('Add new student')}
              </Button>
            </Box>
          </Box>

          <ListChipReport fetching={fetchingReport} report={report as ReportModel} />

          <Paper sx={{ p: 1, height: 'auto' }}>
            <Box className={classes.tableTop}>
              <FilterStudent setPage={setPage} isLoading={isLoading} />
              <SearchButton handleChangeSelectedName={handleChangeSelectedName} setPage={setPage} />
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
                handleOpenProfile={handleOpenProfile}
              />
            )}
          </Paper>
        </Box>
      </Box>

      {/* Create account student */}
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

      {/* Edit Student Form */}
      <Dialog open={openEditStudent} onClose={handleCloseEditStudent} maxWidth='md' fullWidth>
        <DialogContent>
          <EditStudentFormManagement
            student={students[currentId]}
            handleClose={handleCloseEditStudent}
          />
        </DialogContent>
      </Dialog>

      {/* New Student Form */}
      <Dialog open={openNewStudent} onClose={handleCloseNewStudent} maxWidth='md' fullWidth>
        <DialogContent>
          <NewStudentFormManagement open={openNewStudent} handleClose={handleCloseNewStudent} />
        </DialogContent>
      </Dialog>

      {/* Edit Score profile */}
      <Dialog open={openProfile} maxWidth='sm' fullWidth>
        <DialogContent>
          <StudentNoteManagement student={students[currentId]} handleClose={handleCloseProfile} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Students
