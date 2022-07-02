import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

type FilterTeacherProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const FilterTeacher: React.FC<FilterTeacherProps> = ({ setPage }) => {
  const { t } = useTranslation()
  let { search } = useLocation()
  let navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorElPos, setAnchorElPos] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openPos = Boolean(anchorElPos)

  let paginationQuery = queryString.parse(search)
  const position = paginationQuery.position ? (paginationQuery.position as string) : ''
  const department = paginationQuery.department ? (paginationQuery.department as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickPosition = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPos(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClosePosition = () => {
    setAnchorElPos(null)
  }

  async function handleChangeFilterDepartment(department: string) {
    setPage(0)
    if (department === 'all') {
      return navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=`,
      })
    }

    navigate({
      pathname: '/admin/teachers',
      search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=${department}`,
    })
  }

  async function handleChangeFilterPosition(position: string) {
    setPage(0)
    if (position === 'all') {
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=&fullName=${fullName}&department=`,
      })
    } else {
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=${department}`,
      })
    }
  }

  return (
    <Box>
      <Box>
        <Button
          variant='outlined'
          size='small'
          onClick={handleClickPosition}
          style={{ marginRight: 8 }}
        >
          <Typography variant='body1'>{t('Position')}</Typography>
        </Button>
        <Button variant='outlined' size='small' onClick={handleClick}>
          <Typography variant='body1'>{t('Department')}</Typography>
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterDepartment('all')}>-----</MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Văn Phòng Khoa')}>
          {t('Faculty office')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Khoa học Máy tính')}>
          {t('Computer science')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Công nghệ Phần mềm')}>
          {t('Software technology')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('An ninh mạng')}>
          {t('Network security')}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilterDepartment('Hệ thống thông tin')}>
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
        <MenuItem onClick={() => handleChangeFilterPosition('all')}>-----</MenuItem>
        <MenuItem onClick={() => handleChangeFilterPosition('G')}>Giảng viên cơ hữu</MenuItem>
      </Menu>
    </Box>
  )
}

export default FilterTeacher
