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

const FilterStudent: React.FC<FilterStudentProps> = ({ setPage }) => {
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

  const [anchorElAcademicYear, setAnchorElAcademicYear] = useState<null | HTMLElement>(null)
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null)
  const [anchorElTerm, setAnchorElTerm] = useState<null | HTMLElement>(null)
  const [anchorElNameTeacher, setAnchorElNameTeacher] = useState<null | HTMLElement>(null)

  const [academicYearValue, setAcademicYearValue] = useState<number>(academicYear)
  const [statusValue, setStatusValue] = useState<string>('')
  const [termValue, setTermValue] = useState<string>('')
  const [nameTeacherValue, setNameTeacherValue] = useState<string>(nameTeacher)

  const [listTerm, setListTerm] = useState<{ Term: string }[]>([])
  const [listTeacher, setListTeacher] = useState<{ fullName: string }[]>([])

  const openAcademicYear = Boolean(anchorElAcademicYear)
  const openStatus = Boolean(anchorElStatus)
  const openTerm = Boolean(anchorElTerm)
  const openTeacher = Boolean(anchorElNameTeacher)

  useEffect(() => {
    ;(async () => {
      try {
        const listTerm = await studentsApi.getListTerm(academicYear)
        const listTeacherFullname = await teachersApi.getListTeacherFullname(academicYear)
        if (listTerm.length > 0) {
          setListTerm(listTerm)
        }
        if (listTeacherFullname.length > 0) {
          setListTeacher(listTeacherFullname)
        }
      } catch (error) {
        toast.error('Cannot load term or teacher name in current year')
      }
    })()
  }, [academicYear])

  const handleClickAcedemicYear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAcademicYear(event.currentTarget)
  }
  const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElStatus(event.currentTarget)
  }
  const handleClickTerm = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTerm(event.currentTarget)
  }
  const handleClickNameTeacher = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNameTeacher(event.currentTarget)
  }

  const handleCloseAcademicYear = () => {
    setAnchorElAcademicYear(null)
  }
  const handleCloseStatus = () => {
    setAnchorElStatus(null)
  }
  const handleCloseTerm = () => {
    setAnchorElTerm(null)
  }
  const handleCloseNameTeacher = () => {
    setAnchorElNameTeacher(null)
  }

  async function handleChangeFilterStatus(status: string) {
    setPage(0)
    if (status === 'all') {
      setStatusValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
      })
    } else {
      setStatusValue(status)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
      })
    }
  }

  async function handleChangeFilterTerm(term: string) {
    setPage(0)
    if (term === 'all') {
      setTermValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
      })
    } else {
      setTermValue(term)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
      })
    }
  }
  async function handleChangeFilterTeacherName(nameTeacher: string) {
    setPage(0)
    if (nameTeacher === 'all') {
      setNameTeacherValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=`,
      })
    } else {
      setNameTeacherValue(nameTeacher)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
      })
    }
  }

  return (
    <Box className={classes.container}>
      <Typography style={{ marginRight: 8 }}>{t('Search by')}:</Typography>
      <Box>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={handleClickAcedemicYear}
          style={{ marginRight: 8 }}
        >
          <Typography variant='body2'>{`${t('Academic year')} ${
            academicYearValue !== 0 ? ':' : ''
          } ${academicYearValue !== 0 ? academicYearValue : ''}`}</Typography>
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={handleClickStatus}
          style={{ marginRight: 8 }}
        >
          <Typography variant='body2'>{`${t('Internship status')} ${
            statusValue !== '' ? ':' : ''
          } ${statusValue !== '' ? statusValue : ''}`}</Typography>
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={handleClickTerm}
          style={{ marginRight: 8 }}
        >
          <Typography variant='body2'>{`${t('Term')} ${termValue !== '' ? ':' : ''} ${
            termValue !== '' ? termValue : ''
          }`}</Typography>
        </Button>
        <Button variant='contained' size='small' onClick={handleClickNameTeacher}>
          <Typography variant='body2'>{`${t('Lecturer')} ${nameTeacherValue !== '' ? ':' : ''} ${
            nameTeacherValue !== '' ? nameTeacherValue : ''
          }`}</Typography>
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
        <MenuItem onClick={() => handleChangeFilterStatus('all')}>Tất cả</MenuItem>
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
        <MenuItem onClick={() => handleChangeFilterTerm('all')}>Tất cả</MenuItem>
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
        <MenuItem onClick={() => handleChangeFilterTeacherName('all')}>Tất cả</MenuItem>
        {listTeacher &&
          listTeacher.map((name, idx) => (
            <MenuItem onClick={() => handleChangeFilterTeacherName(name.fullName)}>
              {name.fullName}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  )
}

export default FilterStudent
