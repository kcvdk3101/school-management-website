import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

type FilterButtonProps = {}

const FilterButton: React.FC<FilterButtonProps> = () => {
  let navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleChangeFilter(filter: string) {
    if (filter === 'all')
      return navigate({
        pathname: '/admin/students',
      })

    navigate({
      pathname: '/admin/students',
      search: `?status=${filter}`,
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
        <MenuItem onClick={() => handleChangeFilter('Chưa thực tập')}>Chưa thực tập</MenuItem>
        <MenuItem onClick={() => handleChangeFilter('Đang thực tập')}>Đang thực tập</MenuItem>
        <MenuItem onClick={() => handleChangeFilter('Đã thực tập')}>Đã thực tập</MenuItem>
      </Menu>
    </>
  )
}

export default FilterButton
