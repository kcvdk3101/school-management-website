import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import SearchForm from './SearchForm'
import { useNavigate } from 'react-router-dom'

type SearchFormManagementProps = {}

type FieldProps = {
  jobTitle: string
}

const searchSchema = yup
  .object({
    jobTitle: yup.string().required('This field is required'),
  })
  .required()

const SearchFormManagement: React.FC<SearchFormManagementProps> = () => {
  const { register, handleSubmit, formState } = useForm<FieldProps>({
    defaultValues: {
      jobTitle: '',
    },
    resolver: yupResolver(searchSchema),
  })
  let navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: '/job',
      search: `?limit=8&offset=0&title=${data.jobTitle}`,
    })
  })

  return <SearchForm onSubmit={onSubmit} register={register} formState={formState} />
}

export default SearchFormManagement
