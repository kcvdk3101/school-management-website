import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import studentsApi from '../../../../api/university/studentsApi'

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
  const term = paginationQuery.term ? (paginationQuery.term as string) : ''

  const [anchorElAcademicYear, setAnchorElAcademicYear] = useState<null | HTMLElement>(null)
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null)
  const [anchorElTerm, setAnchorElTerm] = useState<null | HTMLElement>(null)

  const [academicYearValue, setAcademicYearValue] = useState<number>(academicYear)
  const [statusValue, setStatusValue] = useState<string>('')
  const [termValue, setTermValue] = useState<string>('')
  const [listTerm, setListTerm] = useState<{ Term: string }[]>([])

  const openAcademicYear = Boolean(anchorElAcademicYear)
  const openStatus = Boolean(anchorElStatus)
  const openTerm = Boolean(anchorElTerm)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await studentsApi.getListTerm(academicYear)
        if (response.length > 0) {
          setListTerm(response)
        }
      } catch (error) {
        toast.error('Cannot load term in current year')
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

  const handleCloseAcademicYear = () => {
    setAnchorElAcademicYear(null)
  }
  const handleCloseStatus = () => {
    setAnchorElStatus(null)
  }
  const handleCloseTerm = () => {
    setAnchorElTerm(null)
  }

  async function handleChangeFilterStatus(status: string) {
    setPage(0)
    if (status === 'all') {
      setStatusValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&status=&term=${term}`,
      })
    } else {
      setStatusValue(status)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&status=${status}&term=${term}`,
      })
    }
  }

  async function handleChangeFilterTerm(term: string) {
    setPage(0)
    if (term === 'all') {
      setTermValue('')
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&status=${status}&term=`,
      })
    } else {
      setTermValue(term)
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=0&status=${status}&term=${term}`,
      })
    }
  }

  return (
    <Box className={classes.container}>
      <Typography style={{ marginRight: 8 }}>{t('Filter')}:</Typography>
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
        <Button variant='contained' size='small' onClick={handleClickTerm}>
          <Typography variant='body2'>{`${t('Term')} ${termValue !== '' ? ':' : ''} ${
            termValue !== '' ? termValue : ''
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
            <MenuItem onClick={() => handleChangeFilterTerm(term.Term)}>{term.Term}</MenuItem>
          ))}
      </Menu>
    </Box>
  )
}

export default FilterStudent
