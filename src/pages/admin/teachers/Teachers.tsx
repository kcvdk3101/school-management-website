import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Toolbar,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import teachersApi from '../../../api/university/teachersApi'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import NoData from '../../../components/commons/NoData'
import EditTeacherFormManagement from '../../../components/form/teacher/edit/EditTeacherFormManagement'
import NewTeacherFormManagement from '../../../components/form/teacher/new/NewTeacherFormManagement'
import SkeletonStudentTable from '../../../components/skeleton/SkeletonStudentTable'
import TeacherTable from '../../../components/tables/TeacherTable'
import {
  getAllTeachers,
  getTeachersByFilter,
  saveTeachersExcelFile,
} from '../../../features/teacher/teacherSlice'
import FilterTeacher from './components/FilterTeacher'
import SearchButton from './components/SearchButton'

type TeachersProps = {}

const Input = styled('input')({
  display: 'none',
})

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
})

const Lecturers: React.FC<TeachersProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  let navigate = useNavigate()
  let { search } = useLocation()

  let paginationQuery = queryString.parse(search)
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0
  const position = paginationQuery.position ? (paginationQuery.position as string) : ''
  const department = paginationQuery.department ? (paginationQuery.department as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''

  const dispatch = useAppDispatch()
  const { fetchingTeacher, teachers } = useAppSelector((state) => state.teachers)

  const [selectedFile, setSelectedFile] = useState<string | Blob | FileList | File>()
  const [nameFile, setNameFile] = useState<string>()
  const [selectedName, setSelectedName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingGenerate, setLoadingGenerate] = useState(false)

  const [page, setPage] = useState(0)
  const [openGenerateTeacher, setOpenGenerateTeacher] = useState(false)
  const [openNewTeacher, setOpenNewTeacher] = useState(false)
  const [openEditTeacher, setOpenEditTeacher] = useState(false)
  const [currentId, setCurrentId] = useState<number>(-1)

  useEffect(() => {
    ;(async () => {
      try {
        if (position || selectedName || department) {
          await dispatch(
            getTeachersByFilter({ offset, position, department, fullName: selectedName })
          )
          return
        }
        await dispatch(getAllTeachers(offset))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch, selectedName, offset, position, department])

  const handleOnChange = (event: any) => {
    setNameFile(event.target.files[0].name)
    setSelectedFile(event.target.files[0])
  }

  const handleOpenGenerateTeacher = () => {
    setOpenGenerateTeacher(true)
  }

  const handleCloseGenerateTeacher = () => {
    setOpenGenerateTeacher(false)
  }

  const handleOpenNewTeacher = () => {
    setOpenNewTeacher(true)
  }

  function handleCloseNewTeacher() {
    setOpenNewTeacher(false)
  }

  function handleOpenEditTeacher(id: number) {
    setCurrentId(id)
    setOpenEditTeacher(true)
  }

  const handleCloseEditTeacher = () => {
    setOpenEditTeacher(false)
  }

  const handleChangeSelectedName = (value: string) => {
    setSelectedName(value)
  }

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    try {
      if (position || fullName || department) {
        await dispatch(getTeachersByFilter({ offset: newPage, position, department, fullName }))
      } else {
        await dispatch(getAllTeachers(newPage))
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=${newPage}&position=${position}&fullName=${fullName}&department=${department}`,
      })
    }
  }

  const saveExcelFile = async () => {
    const formData = new FormData()
    formData.append('files', selectedFile as Blob)
    setIsLoading(true)
    try {
      const response = await dispatch(saveTeachersExcelFile(formData))
      if (response.meta.requestStatus === 'fulfilled') {
        ;(async () => {
          try {
            await dispatch(getAllTeachers(0))
            toast.success('Save successfully')
            setSelectedFile(undefined)
          } catch (error) {
            toast.error(error as any)
          } finally {
            setIsLoading(false)
          }
        })()
      } else {
        toast.error('Something wrong')
      }
    } catch (error) {
      toast.error(error as any)
    } finally {
      setIsLoading(false)
    }
  }

  const generateAccountTeacher = async () => {
    setLoadingGenerate(true)
    try {
      const response = await teachersApi.generateTeacherAccount()
      if (response.status === 200) {
        toast.success(response.message)
        setLoadingGenerate(false)
      }
    } catch (error) {
      toast.error('Cannot generate account for all teachers')
    } finally {
      setLoadingGenerate(false)
      handleCloseGenerateTeacher()
    }
  }

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
                onClick={handleOpenGenerateTeacher}
                sx={{ mr: 2 }}
                disabled={isLoading}
              >
                {t('Generate teacher account')}
              </Button>
              <Button
                variant='contained'
                color='secondary'
                type='button'
                onClick={handleOpenNewTeacher}
                disabled={isLoading}
              >
                {t('Add new teacher')}
              </Button>
            </Box>
          </Box>

          <Paper sx={{ p: 1, height: 'auto' }}>
            <Box className={classes.tableTop}>
              <SearchButton handleChangeSelectedName={handleChangeSelectedName} setPage={setPage} />
              <FilterTeacher setPage={setPage} />
            </Box>
            {fetchingTeacher ? (
              <SkeletonStudentTable columns={6} />
            ) : teachers.length === 0 ? (
              <NoData />
            ) : (
              <TeacherTable
                page={page}
                teachers={teachers}
                handleChangePage={handleChangePage}
                handleOpenEditTeacher={handleOpenEditTeacher}
              />
            )}
          </Paper>
        </Box>
      </Box>

      {/* Create account Teacher */}
      <Dialog open={openGenerateTeacher}>
        <DialogTitle>{t('Create account heading')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('Create account content')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGenerateTeacher} disabled={loadingGenerate}>
            {t('Cancel')}
          </Button>
          <Button onClick={generateAccountTeacher} autoFocus disabled={loadingGenerate}>
            {loadingGenerate ? <CircularProgress size={20} /> : t('Create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Teacher Form */}
      <Dialog open={openEditTeacher} onClose={handleCloseEditTeacher} maxWidth='md' fullWidth>
        <DialogContent>
          <EditTeacherFormManagement
            lecturer={teachers[currentId]}
            handleClose={handleCloseEditTeacher}
          />
        </DialogContent>
      </Dialog>

      {/* New Teacher Form */}
      <Dialog open={openNewTeacher} onClose={handleCloseNewTeacher} maxWidth='md' fullWidth>
        <DialogContent>
          <NewTeacherFormManagement open={openNewTeacher} handleClose={handleCloseNewTeacher} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Lecturers
