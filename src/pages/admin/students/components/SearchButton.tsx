import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { getStudentsByFilter } from '../../../../features/student/studentsSlice'

type SearchButtonProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  handleChangeSelectedName: (value: string) => void
}

const SearchButton: React.FC<SearchButtonProps> = ({ setPage, handleChangeSelectedName }) => {
  const { t } = useTranslation()
  let { search } = useLocation()
  let navigate = useNavigate()
  const dispatch = useAppDispatch()

  let paginationQuery = queryString.parse(search)
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''
  const term = paginationQuery.term ? (paginationQuery.term as string) : ''

  const [searchInput, setSearchInput] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getStudentsByFilter({ offset, status, fullName: searchInput, term }))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [dispatch, searchInput])

  return (
    <Box component='div' sx={{ mx: 1 }}>
      <TextField
        fullWidth
        placeholder={t('Search fullname')}
        variant='standard'
        sx={{ p: 1 }}
        type='search'
        onChange={(e) => {
          setSearchInput(e.target.value)
          handleChangeSelectedName(e.target.value)
          if (!e.target.value) {
            navigate({
              pathname: '/admin/students',
              search: `?limit=8&offset=0&status=${status}`,
            })
          } else {
            navigate({
              pathname: '/admin/students',
              search: `?limit=8&offset=0&status=${status}&fullName=${e.target.value}`,
            })
          }
          setPage(0)
        }}
      />
    </Box>
  )
}

export default SearchButton
