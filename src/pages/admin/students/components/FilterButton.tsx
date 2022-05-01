import FilterListIcon from '@mui/icons-material/FilterList'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'

type FilterButtonProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const FilterButton: React.FC<FilterButtonProps> = ({ setPage }) => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  let { search } = useLocation()

  let paginationQuery = queryString.parse(search)
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleChangeFilter(status: string) {
    setPage(0)
    if (status === 'all')
      return navigate({
        pathname: '/admin/students',
      })

    navigate({
      pathname: '/admin/students',
      search: `?limit=8&offset=0&status=${status}&fullName=${fullName}`,
    })
  }

  return (
    <>
      <IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }} onClick={handleClick}>
        <FilterListIcon />
      </IconButton>
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
    </>
  )
}

export default FilterButton
