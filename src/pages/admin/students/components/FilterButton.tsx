import { Button, Menu, MenuItem, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { useAppDispatch } from '../../../../app/hooks'
import { getStudentsByFilter } from '../../../../features/student/studentsSlice'

type FilterButtonProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const FilterButton: React.FC<FilterButtonProps> = ({ setPage }) => {
  const { t } = useTranslation()
  let { search } = useLocation()

  let navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorElTerm, setAnchorElTerm] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openTerm = Boolean(anchorElTerm)

  let paginationQuery = queryString.parse(search)
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''
  const term = paginationQuery.term ? (paginationQuery.term as string) : ''

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickTerm = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTerm(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCloseTerm = () => {
    setAnchorElTerm(null)
  }

  async function handleChangeFilter(status: string) {
    setPage(0)
    await dispatch(getStudentsByFilter({ offset, status, fullName, term }))
    // if (status === '') {
    // }
    // if (status === 'all')
    //   return navigate({
    //     pathname: '/admin/students',
    //   })

    // navigate({
    //   pathname: '/admin/students',
    //   search: `?limit=8&offset=0&status=${status}`,
    // })
  }

  async function handleChangeFilterTerm(term: string) {
    setPage(0)
    await dispatch(getStudentsByFilter({ offset, status, fullName, term }))
    // if (status === '') {
    // }
    // if (status === 'all')
    //   return navigate({
    //     pathname: '/admin/students',
    //   })

    // navigate({
    //   pathname: '/admin/students',
    //   search: `?limit=8&offset=0&status=${status}`,
    // })
  }

  return (
    <Box>
      <Box>
        <Button variant='outlined' size='small' onClick={handleClick}>
          <Typography variant='body1'>{t('Internship status')}</Typography>
        </Button>
        <Button variant='outlined' size='small' onClick={handleClickTerm} style={{ marginLeft: 8 }}>
          <Typography variant='body1'>{t('Term')}</Typography>
        </Button>
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilter('all')}>-----</MenuItem>
        <MenuItem onClick={() => handleChangeFilter('Chưa thực tập')}>
          {t("Haven't practiced")}
        </MenuItem>
        <MenuItem onClick={() => handleChangeFilter('Đang thực tập')}>{t('Practicing')}</MenuItem>
        <MenuItem onClick={() => handleChangeFilter('Đã thực tập')}>{t('Trained')}</MenuItem>
      </Menu>
      <Menu
        id='basic-menu'
        anchorEl={anchorElTerm}
        open={openTerm}
        onClose={handleCloseTerm}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterTerm('all')}>-----</MenuItem>
        <MenuItem onClick={() => handleChangeFilterTerm('K24')}>K24</MenuItem>
        <MenuItem onClick={() => handleChangeFilterTerm('K24')}>K23</MenuItem>
      </Menu>
    </Box>
  )
}

export default FilterButton
