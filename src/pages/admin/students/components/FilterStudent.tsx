import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import studentsApi from '../../../../api/university/studentsApi'
import teachersApi from '../../../../api/university/teachersApi'

type FilterStudentProps = {
  isLoading: boolean
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const useStyles = makeStyles({
  container: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 16,
  },
})

const FilterStudent: React.FC<FilterStudentProps> = ({ isLoading, setPage }) => {
  const { t } = useTranslation()
  let { search } = useLocation()
  let navigate = useNavigate()
  const classes = useStyles()

  let paginationQuery = queryString.parse(search)
  const academicYear = paginationQuery.academicYear ? +paginationQuery.academicYear : 0
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''
  const term = paginationQuery.term ? (paginationQuery.term as string) : ''
  const nameTeacher = paginationQuery.nameTeacher ? (paginationQuery.nameTeacher as string) : ''
  const specialization = paginationQuery.specialization
    ? (paginationQuery.specialization as string)
    : ''

  // const [anchorElAcademicYear, setAnchorElAcademicYear] = useState<null | HTMLElement>(null)
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null)
  const [anchorElTerm, setAnchorElTerm] = useState<null | HTMLElement>(null)
  const [anchorElNameTeacher, setAnchorElNameTeacher] = useState<null | HTMLElement>(null)
  const [anchorElSpecialization, setAnchorElSpecialization] = useState<null | HTMLElement>(null)

  const [academicYearValue, setAcademicYearValue] = useState<number>(academicYear)
  const [statusValue, setStatusValue] = useState<string>(status)
  const [termValue, setTermValue] = useState<string>(term)
  const [nameTeacherValue, setNameTeacherValue] = useState<string>(nameTeacher)
  const [specializationValue, setSpecializationValue] = useState<string>(specialization)

  const [listTerm, setListTerm] = useState<{ Term: string }[]>([])
  const [listTeacher, setListTeacher] = useState<{ fullName: string }[]>([])
  const [listSpecialization, setListSpecialization] = useState<{ specialization: string }[]>([])

  // const openAcademicYear = Boolean(anchorElAcademicYear)
  const openStatus = Boolean(anchorElStatus)
  const openTerm = Boolean(anchorElTerm)
  const openTeacher = Boolean(anchorElNameTeacher)
  const openSpecialization = Boolean(anchorElSpecialization)

  useEffect(() => {
    ;(async () => {
      try {
        const listTerm = await studentsApi.getListTerm(academicYear)
        const listSpecialization = await studentsApi.getListSpecialization(academicYear)
        const listTeacherFullname = await teachersApi.getListTeacherFullname(academicYear)
        if (listTerm.length > 0 && listSpecialization.length > 0) {
          setListTerm(listTerm)
          setListSpecialization(listSpecialization)
        }
        if (listTeacherFullname.length > 0) {
          setListTeacher(listTeacherFullname)
        }
      } catch (error) {
        toast.error('Cannot load term or teacher name in current year')
      }
    })()
  }, [academicYear])

  // const handleClickAcedemicYear = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorElAcademicYear(event.currentTarget)
  // }
  const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElStatus(event.currentTarget)
  }
  const handleClickTerm = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTerm(event.currentTarget)
  }
  const handleClickNameTeacher = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNameTeacher(event.currentTarget)
  }
  const handleClickSpecialization = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSpecialization(event.currentTarget)
  }

  // const handleCloseAcademicYear = () => {
  //   setAnchorElAcademicYear(null)
  // }
  const handleCloseStatus = () => {
    setAnchorElStatus(null)
  }
  const handleCloseTerm = () => {
    setAnchorElTerm(null)
  }
  const handleCloseNameTeacher = () => {
    setAnchorElNameTeacher(null)
  }
  const handleCloseSpecialization = () => {
    setAnchorElSpecialization(null)
  }

  async function handleChangeFilterStatus(status: string) {
    setPage(0)
    if (status === 'all') {
      setStatusValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}&specialization=${specialization}`,
      })
    } else {
      setStatusValue(status)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}&specialization=${specialization}`,
      })
    }
  }
  async function handleChangeFilterTerm(term: string) {
    setPage(0)
    if (term === 'all') {
      setTermValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=&academicYear=${academicYear}&nameTeacher=${nameTeacher}&specialization=${specialization}`,
      })
    } else {
      setTermValue(term)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}&specialization=${specialization}`,
      })
    }
  }
  async function handleChangeFilterTeacherName(nameTeacher: string) {
    setPage(0)
    if (nameTeacher === 'all') {
      setNameTeacherValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=&specialization=${specialization}`,
      })
    } else {
      setNameTeacherValue(nameTeacher)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}&specialization=${specialization}`,
      })
    }
  }
  async function handleChangeFilterSpecialization(specialization: string) {
    setPage(0)
    if (specialization === 'all') {
      setSpecializationValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}&specialization=`,
      })
    } else {
      setSpecializationValue(specialization)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}&specialization=${specialization}`,
      })
    }
  }

  return (
    <Box className={classes.container}>
      <Typography style={{ marginRight: 8 }}>{t('Search by')}:</Typography>
      <Box>
        <Button
          style={{ marginRight: 8 }}
          variant='contained'
          size='small'
          // onClick={handleClickAcedemicYear}
          disabled={isLoading}
        >
          <Typography variant='body2'>{`${t('Academic year')} ${
            academicYearValue !== 0 ? ':' : ''
          } ${academicYearValue !== 0 ? academicYearValue : ''}`}</Typography>
        </Button>
        <Button
          style={{ marginRight: 8 }}
          variant='contained'
          size='small'
          onClick={handleClickStatus}
          disabled={isLoading}
        >
          <Typography variant='body2'>{`${t('Internship status')} ${
            statusValue !== '' ? ':' : ''
          } ${statusValue !== '' ? statusValue : ''}`}</Typography>
        </Button>
        <Button
          style={{ marginRight: 8 }}
          variant='contained'
          size='small'
          disabled={isLoading}
          onClick={handleClickTerm}
        >
          <Typography variant='body2'>{`${t('Term')} ${termValue !== '' ? ':' : ''} ${
            termValue !== '' ? termValue : ''
          }`}</Typography>
        </Button>
        <Button
          style={{ marginRight: 8 }}
          variant='contained'
          size='small'
          onClick={handleClickNameTeacher}
          disabled={isLoading}
        >
          <Typography variant='body2'>{`${t('Lecturer')} ${nameTeacherValue !== '' ? ':' : ''} ${
            nameTeacherValue !== '' ? nameTeacherValue : ''
          }`}</Typography>
        </Button>
        <Button
          style={{ marginRight: 8 }}
          variant='contained'
          size='small'
          onClick={handleClickSpecialization}
          disabled={isLoading}
        >
          <Typography variant='body2'>{`${t('Specialization')} ${
            specializationValue !== '' ? ':' : ''
          } ${specializationValue !== '' ? specializationValue : ''}`}</Typography>
        </Button>
      </Box>

      <Menu
        anchorEl={anchorElStatus}
        open={openStatus}
        onClose={handleCloseStatus}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterStatus('all')}>{t('All')}</MenuItem>
        <MenuItem onClick={() => handleChangeFilterStatus('Chưa thực tập')}>
          {t("Haven't practiced")}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterStatus('Đang thực tập')}>
          {t('Practicing')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterStatus('Đã thực tập')}>{t('Trained')}</MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElTerm}
        open={openTerm}
        onClose={handleCloseTerm}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterTerm('all')}>{t('All')}</MenuItem>
        {listTerm &&
          listTerm.map((term, idx) => (
            <MenuItem key={idx} onClick={() => handleChangeFilterTerm(term.Term)}>
              {term.Term}
            </MenuItem>
          ))}
      </Menu>
      <Menu
        anchorEl={anchorElNameTeacher}
        open={openTeacher}
        onClose={handleCloseNameTeacher}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterTeacherName('all')}>{t('All')}</MenuItem>
        {listTeacher &&
          listTeacher.map((name, idx) => (
            <MenuItem key={idx} onClick={() => handleChangeFilterTeacherName(name.fullName)}>
              {name.fullName}
            </MenuItem>
          ))}
      </Menu>
      <Menu
        anchorEl={anchorElSpecialization}
        open={openSpecialization}
        onClose={handleCloseSpecialization}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterSpecialization('all')}>{t('All')}</MenuItem>
        {listSpecialization &&
          listSpecialization.map((s, idx) => (
            <MenuItem key={idx} onClick={() => handleChangeFilterSpecialization(s.specialization)}>
              {s.specialization}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  )
}

export default FilterStudent
