import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import queryString from 'query-string'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../../../../app/hooks'
import { editInfoTeacher } from '../../../../features/teacher/teacherSlice'
import { TeacherModel } from '../../../../models/teacher.model'
import EditTeacherForm from './EditTeacherForm'

type EditTeacherFormManagementProps = {
  lecturer: TeacherModel
  handleClose: () => void
}

type EditFormInput = {
  lastName: string
  firstName: string
  email: string
  position: string
  department: string
  phoneNumber: string
}

const editTeacherSchema = yup.object({
  lastName: yup.string().required('This field is required'),
  firstName: yup.string().required('This field is required'),
  email: yup
    .string()

    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@huflit.edu.vn$/,
      'Email is invalid'
    )
    .required('This field is required'),
  position: yup.string().required('This field is required'),
  department: yup.string().required('This field is required'),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is invalid'
    )
    .test(
      'checkPhoneNumberLength',
      'Phone number must be exactly 10 numbers',
      (val) => val?.toString().length === 10
    )
    .required('This field is required'),
})

const EditTeacherFormManagement: React.FC<EditTeacherFormManagementProps> = ({
  lecturer,
  handleClose,
}) => {
  const { t } = useTranslation()
  let navigate = useNavigate()
  let { search } = useLocation()

  const dispatch = useAppDispatch()

  let paginationQuery = queryString.parse(search)
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0
  const status = paginationQuery.status ? (paginationQuery.status as string) : ''

  const { register, handleSubmit, formState } = useForm<EditFormInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(editTeacherSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(
        editInfoTeacher({
          id: lecturer.id as string,
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            department: data.department,
            position: data.position,
            email: data.email,
          },
        })
      )
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=${offset}&status=${status}`,
      })
      toast.success('Update successfully!')
    } catch (error) {
      toast.error(error as Error)
    } finally {
      handleClose()
    }
  })

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {t('Edit lecturer title')}
      </Typography>
      <form onSubmit={onSubmit}>
        <EditTeacherForm
          lecturer={lecturer}
          register={register}
          formState={formState}
          handleClose={handleClose}
        />
      </form>
    </Box>
  )
}

export default EditTeacherFormManagement
