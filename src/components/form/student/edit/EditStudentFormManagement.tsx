import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Paper, Typography } from '@mui/material'
import EditStudentForm from './EditStudentForm'
import { StudentModel } from '../../../../models'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { editInfoStudent, getStudents } from '../../../../features/student/studentsSlice'
import { useAppDispatch } from '../../../../app/hooks'
import { toast } from 'react-toastify'

type EditStudentFormManagementProps = {
  student: StudentModel
  handleClose: () => void
  page: number
}

type EditFormInput = {
  lastName: string
  firstName: string
  address: string
  phoneNumber: string
}

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

const editSchema = yup
  .object({
    lastName: yup.string().trim(),
    firstName: yup.string().trim(),
    address: yup.string().trim(),
    phoneNumber: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid'
      ),
  })
  .required('This field is required')

const EditStudentFormManagement: React.FC<EditStudentFormManagementProps> = ({
  student,
  page,
  handleClose,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState } = useForm<EditFormInput>({
    resolver: yupResolver(editSchema),
  })

  const [value, setValue] = useState<string | null>(student.birthDate)

  const handleChangeValue = (value: string | null) => {
    setValue(value)
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
          },
        })
      )
      await dispatch(getStudents(page))
      toast.success('Update succeed!')
    } catch (error) {
      toast.error(error as Error)
    } finally {
      handleClose()
    }
  })

  return (
    <Box maxWidth='sm' className={classes.modal}>
      <Paper
        sx={{
          p: 2,
        }}
      >
        <Typography variant='h6' sx={{ mb: 2 }}>
          {t('Edit student title')}
        </Typography>
        <form onSubmit={onSubmit}>
          <EditStudentForm
            register={register}
            formState={formState}
            student={student}
            handleClose={handleClose}
            value={value}
            handleChangeValue={handleChangeValue}
          />
        </form>
      </Paper>
    </Box>
  )
}

export default EditStudentFormManagement
