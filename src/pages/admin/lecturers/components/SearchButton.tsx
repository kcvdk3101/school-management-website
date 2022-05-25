import SearchIcon from '@mui/icons-material/Search'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { getStudentsByFilter } from '../../../../features/student/studentsSlice'
import { StudentModel } from '../../../../models'

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

  const [searchInput, setSearchInput] = useState<string>('')
  const [results, setResults] = useState<StudentModel[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await dispatch(
          getStudentsByFilter({ offset, status, fullName: searchInput })
        )
        console.log(response.payload)
        // setResults(response.data.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [searchInput])

  return (
    <Box component='div' sx={{ mx: 1 }}>
      <Stack sx={{ minWidth: 300, maxWidth: 350 }}>
        <Autocomplete
          disableClearable
          freeSolo
          getOptionLabel={(option) => option.fullName}
          options={results}
          onChange={(e, value: any) => {
            setSearchInput(value.fullName)
            handleChangeSelectedName(value.fullName)
            setPage(0)
            navigate({
              pathname: '/admin/students',
              search: `?limit=8&offset=0&status=${status}&fullName=${value.fullName}`,
            })
          }}
          clearIcon={<SearchIcon fontSize='large' />}
          renderOption={(props, student) => (
            <Box component='li' {...props} key={student.identityNumber}>
              {student.fullName}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
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
          )}
        />
      </Stack>
    </Box>
  )
}

export default SearchButton
