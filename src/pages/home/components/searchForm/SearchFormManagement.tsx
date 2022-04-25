import React from 'react'
import SearchForm from './SearchForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SelectChangeEvent } from '@mui/material'

type SearchFormManagementProps = {}

type FieldProps = {
  kw: string
  location: string
}

const searchSchema = yup
  .object({
    firstName: yup.string(),
    age: yup.number().positive().integer(),
  })
  .required()

const SearchFormManagement: React.FC<SearchFormManagementProps> = () => {
  const { register, handleSubmit, formState, watch, setValue } = useForm<FieldProps>({
    defaultValues: {
      kw: '',
      location: '',
    },
    resolver: yupResolver(searchSchema),
  })

  const city = watch('location')
  const handleChange = (e: SelectChangeEvent<string>) => setValue('location', e.target.value)

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <SearchForm
      onSubmit={onSubmit}
      register={register}
      formState={formState}
      city={city}
      handleChange={handleChange}
    />
  )
}

export default SearchFormManagement
