import { yupResolver } from '@hookform/resolvers/yup'
import { Box, SelectChangeEvent, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
    .required('This field is required')
    .typeError('This field is not a number'),
  internshipSecondGrade: yup
    .number()
    .integer()
    .positive()
    .min(0, 'Point must be greater than or equal to 0')
    .max(10, 'point does not exceed 10')
    .required('This field is required')
    .typeError('This field is not a number'),
})

const EditStudentFormManagement: React.FC<EditStudentFormManagementProps> = ({
  student,
  handleClose,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

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
      const response = await dispatch(
        editInfoStudent({
          id: student.id as string,
          data: {
            ...student,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            birthDate: value as string,
            phoneNumber: data.phoneNumber,
            class: data.class,
            status: selectedStatus,
            internshipFirstGrade: data.internshipFirstGrade,
            internshipSecondGrade: data.internshipSecondGrade,
            internshipThirdGrade: Number(student.internshipThirdGrade),
          },
        })
      )
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(t('Update successfully !'))
      }
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
