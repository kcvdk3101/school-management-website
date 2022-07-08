import { yupResolver } from '@hookform/resolvers/yup'
import { Box, SelectChangeEvent, Typography } from '@mui/material'
import queryString from 'query-string'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../../../../app/hooks'
import { editInfoStudent } from '../../../../features/student/studentsSlice'
import { StudentModel } from '../../../../models/student.model'
import EditStudentForm from './EditStudentForm'

type EditStudentFormManagementProps = {
  student: StudentModel
  handleClose: () => void
}

type EditFormInput = {
  lastName: string
  firstName: string
  address: string
  phoneNumber: string
  class: string
  internshipFirstGrade: number
  internshipSecondGrade: number
  internshipThirdGrade: number
}

const editSchema = yup.object({
  lastName: yup.string().trim().required('This field is required'),
  firstName: yup.string().trim().required('This field is required'),
  address: yup.string().trim().required('This field is required'),
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
  class: yup
    .string()
    .test(
      'checkClassLength',
      'Class must be exactly 6 characters',
      (val) => val?.toString().length === 6
    )
    .test('checkValidClass', 'Class is invalid', function (value) {
      if (value?.startsWith('AN') || value?.startsWith('PM') || value?.startsWith('TT')) {
        return true
      }
      return false
    })
    .required('This field is required'),
  internshipFirstGrade: yup
    .number()
    .integer()
    .positive()
    .min(0, 'Point must be greater than or equal to 0')
    .max(10, 'point does not exceed 10')
    .required('This field is required'),
  internshipSecondGrade: yup
    .number()
    .integer()
    .positive()
    .min(0, 'Point must be greater than or equal to 0')
    .max(10, 'point does not exceed 10')
    .required('This field is required'),
  internshipThirdGrade: yup
    .number()
    .integer()
    .positive()
    .min(0, 'Point must be greater than or equal to 0')
    .max(10, 'point does not exceed 10')
    .required('This field is required'),
})

const EditStudentFormManagement: React.FC<EditStudentFormManagementProps> = ({
  student,
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
    resolver: yupResolver(editSchema),
  })

  const [value, setValue] = useState<string | null>(student.birthDate)
  const [selectedStatus, setSelectedStatus] = useState<string>(student.status)

  const handleChangeValue = (value: string | null) => {
    setValue(value)
  }

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value as string)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(
        editInfoStudent({
          id: student.id as string,
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            birthDate: value as string,
            phoneNumber: data.phoneNumber,
            class: data.class,
            status: selectedStatus,
            internshipFirstGrade: data.internshipFirstGrade,
            internshipSecondGrade: data.internshipSecondGrade,
            internshipThirdGrade: data.internshipThirdGrade,
          },
        })
      )
      navigate({
        pathname: '/admin/students',
        search: `?limit=8&offset=${offset}&status=${status}`,
      })
      toast.success('Update succeed!')
    } catch (error) {
      toast.error(error as Error)
    } finally {
      handleClose()
    }
  })

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {t('Edit student title')}
      </Typography>
      <form onSubmit={onSubmit}>
        <EditStudentForm
          value={value}
          status={selectedStatus}
          student={student}
          register={register}
          formState={formState}
          handleClose={handleClose}
          handleChangeValue={handleChangeValue}
          handleChangeStatus={handleChangeStatus}
        />
      </form>
    </Box>
  )
}

export default EditStudentFormManagement
