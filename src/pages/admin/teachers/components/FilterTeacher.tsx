import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { makeStyles } from '@mui/styles'

type FilterTeacherProps = {
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

const FilterTeacher: React.FC<FilterTeacherProps> = ({ setPage }) => {
  const { t } = useTranslation()
  let { search } = useLocation()
  const classes = useStyles()

  let navigate = useNavigate()
  let paginationQuery = queryString.parse(search)
  const academicYear = paginationQuery.academicYear ? (paginationQuery.academicYear as string) : ''
  const position = paginationQuery.position ? (paginationQuery.position as string) : ''
  const department = paginationQuery.department ? (paginationQuery.department as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''

  const [academicYearValue, setAcademicYearValue] = useState<string>(academicYear)
  const [positionValue, setPositionValue] = useState<string>('')
  const [departmentValue, setDepartmentValue] = useState<string>('')
  const [anchorElAcademic, setAnchorElAcademic] = useState<null | HTMLElement>(null)
  const [anchorElPos, setAnchorElPos] = useState<null | HTMLElement>(null)
  const [anchorElDepartment, setAnchorElDepartment] = useState<null | HTMLElement>(null)

  const openAcademic = Boolean(anchorElAcademic)
  const openDepartment = Boolean(anchorElDepartment)
  const openPos = Boolean(anchorElPos)

  const handleClickAcedemicYear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAcademic(event.currentTarget)
  }
  const handleClickDepartment = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDepartment(event.currentTarget)
  }
  const handleClickPosition = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPos(event.currentTarget)
  }

  const handleCloseAcademicYear = () => {
    setAnchorElAcademic(null)
  }
  const handleCloseDepartment = () => {
    setAnchorElDepartment(null)
  }
  const handleClosePosition = () => {
    setAnchorElPos(null)
  }

  async function handleChangeFilterPosition(position: string) {
    setPage(0)
    if (position === 'all') {
      setPositionValue('')
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=&fullName=${fullName}&department=&academicYear=${academicYear}`,
      })
    } else {
      setPositionValue(position)
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=${department}&academicYear=${academicYear}`,
      })
    }
  }

  async function handleChangeFilterDepartment(department: string) {
    setPage(0)
    if (department === 'all') {
      setDepartmentValue('')
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=&academicYear=${academicYear}`,
      })
    } else {
      setDepartmentValue(department)
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=${department}&academicYear=${academicYear}`,
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
            academicYearValue !== '' ? ':' : ''
          } ${academicYearValue !== '' ? academicYearValue : ''}`}</Typography>
        </Button>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={handleClickPosition}
          style={{ marginRight: 8 }}
        >
          <Typography variant='body2'>{`${t('Position')} ${positionValue !== '' ? ':' : ''} ${
            positionValue !== '' ? positionValue : ''
          }`}</Typography>
        </Button>
        <Button variant='contained' color='primary' size='small' onClick={handleClickDepartment}>
          <Typography variant='body2'>{`${t('Department')} ${departmentValue !== '' ? ':' : ''} ${
            departmentValue !== '' ? departmentValue : ''
          }`}</Typography>
        </Button>
      </Box>

      <Menu
        anchorEl={anchorElDepartment}
        open={openDepartment}
        onClose={handleCloseDepartment}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterDepartment('all')}>Tất cả</MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Văn phòng khoa')}>
          {t('Faculty office')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Khoa học Máy tính')}>
          {t('Computer science')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Công nghệ Phần mềm')}>
          {t('Software technology')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('An ninh mạng')}>
          {t('Network security')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Hệ thống thông tin')}>
          {t('Information system')}
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElPos}
        open={openPos}
        onClose={handleClosePosition}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterPosition('all')}>Tất cả</MenuItem>
        <MenuItem onClick={() => handleChangeFilterPosition('Trưởng khoa')}>Trưởng khoa</MenuItem>
        <MenuItem onClick={() => handleChangeFilterPosition('Phó Trưởng khoa')}>
          Phó Trưởng khoa
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterPosition('Quản lý PM')}>Quản lý PM</MenuItem>
        <MenuItem onClick={() => handleChangeFilterPosition('Chuyên viên CTSV')}>
          Chuyên viên CTSV
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterPosition('Trợ lý giáo vụ khoa	')}>
          Trợ lý giáo vụ khoa
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterPosition('Giảng viên cơ hữu')}>
          Giảng viên cơ hữu
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default FilterTeacher
