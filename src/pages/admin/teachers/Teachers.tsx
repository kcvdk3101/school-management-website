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
} from '@mui/material'
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
import FilterButton from './components/FilterButton'
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

const Lecturers: React.FC<TeachersProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  let navigate = useNavigate()
  let { search } = useLocation()

  let paginationQuery = queryString.parse(search)
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''

  const dispatch = useAppDispatch()
  const { fetchingTeacher, teachers } = useAppSelector((state) => state.teachers)

  const [selectedFile, setSelectedFile] = useState<string | Blob | FileList | File>()
  const [nameFile, setNameFile] = useState<string>()
  const [selectedName, setSelectedName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [page, setPage] = useState(0)
  const [openNewTeacher, setOpenNewTeacher] = useState(false)
  const [openEditTeacher, setOpenEditTeacher] = useState(false)
  const [currentId, setCurrentId] = useState<number>(-1)

  useEffect(() => {
    ;(async () => {
      try {
        if (status || selectedName) {
          await dispatch(getTeachersByFilter({ offset, status, fullName: selectedName }))
          return
        }
        await dispatch(getAllTeachers(offset))
      } catch (error) {
        console.log(error)
      }
    })()
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

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage)
    try {
      if (status || fullName) {
        await dispatch(getTeachersByFilter({ offset: newPage, status, fullName }))
      } else {
        await dispatch(getAllTeachers(newPage))
      }
    } catch (error) {
      console.log(error)
    } finally {
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=${newPage}&status=${status}&fullName=${fullName}`,
      })
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
                // onClick={handleOpenGenerate}
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
              >
                {t('Add new teacher')}
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

      {/* Edit Student Form */}
      <Dialog open={openEditTeacher} onClose={handleCloseEditTeacher} maxWidth='md' fullWidth>
        <DialogContent>
          <EditTeacherFormManagement
            lecturer={teachers[currentId]}
            handleClose={handleCloseEditTeacher}
          />
        </DialogContent>
      </Dialog>

      {/* New Student Form */}
      <Dialog open={openNewTeacher} onClose={handleCloseNewTeacher} maxWidth='md' fullWidth>
        <DialogContent>
          <NewTeacherFormManagement open={openNewTeacher} handleClose={handleCloseNewTeacher} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Lecturers
