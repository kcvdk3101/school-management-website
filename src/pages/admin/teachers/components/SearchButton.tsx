import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import queryString from 'query-string'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

type SearchButtonProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  handleChangeSelectedName: (value: string) => void
}

const SearchButton: React.FC<SearchButtonProps> = ({ setPage, handleChangeSelectedName }) => {
  const { t } = useTranslation()
  let { search } = useLocation()
  let navigate = useNavigate()

  let paginationQuery = queryString.parse(search)
  const position = paginationQuery.position ? (paginationQuery.position as string) : ''
  const department = paginationQuery.department ? (paginationQuery.department as string) : ''

  return (
    <Box component='div' sx={{ mx: 1 }}>
      <Stack sx={{ minWidth: 300, maxWidth: 350 }}>
        <TextField
          fullWidth
          placeholder={t('Search fullname')}
          variant='standard'
          sx={{ p: 1 }}
          type='search'
          onChange={(e) => {
            handleChangeSelectedName(e.target.value)
            if (!e.target.value) {
              navigate({
                pathname: '/admin/teachers',
                search: `?limit=8&offset=0&position=${position}&department=${department}`,
              })
            } else {
              navigate({
                pathname: '/admin/teachers',
                search: `?limit=8&offset=0&position=${position}&fullName=${e.target.value}&department=${department}`,
              })
            }
            setPage(0)
          }}
        />
      </Stack>
    </Box>
  )
}

export default SearchButton
