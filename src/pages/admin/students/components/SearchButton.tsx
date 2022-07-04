import Box from '@mui/material/Box'
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
  const academicYear = paginationQuery.academicYear ? +paginationQuery.academicYear : 0
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''
  const term = paginationQuery.term ? (paginationQuery.term as string) : ''
  const nameTeacher = paginationQuery.nameTeacher ? (paginationQuery.nameTeacher as string) : ''

  return (
    <Box component='div' sx={{ mx: 1 }}>
      <TextField
        fullWidth
        placeholder={t('Search fullname')}
        variant='standard'
        sx={{ p: 1 }}
        type='search'
        onChange={(e) => {
          // setSearchInput(e.target.value)
          handleChangeSelectedName(e.target.value)
          if (!e.target.value) {
            navigate({
              pathname: '/admin/students',
              search: `?limit=10&offset=0&identityNumber=&status=${status}&fullName=&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
            })
          } else {
            navigate({
              pathname: '/admin/students',
              search: `?limit=10&offset=0&identityNumber=&status=${status}&fullName=${e.target.value}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`,
            })
          }
          setPage(0)
        }}
      />
    </Box>
  )
}

export default SearchButton
