import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Paper, Typography } from '@mui/material'
import EditStudentForm from './EditStudentForm'
import { StudentModel } from '../../../../models'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { editInfoStudent } from '../../../../features/student/studentsSlice'
import { useAppDispatch } from '../../../../app/hooks'
import { toast } from 'react-toastify'

type EditStudentFormManagementProps = {
  student: StudentModel
  handleClose: () => void
}

type Input = {
  lastName: string
  firstName: string
  identityNumber: string
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
    identityNumber: yup.string().trim(),
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
  handleClose,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState } = useForm<Input>({
    resolver: yupResolver(editSchema),
  })

  const [value, setValue] = useState<string | null>(student.birthDate)

  const handleChangeValue = (value: string | null) => {
    setValue(value)
  }

  const onSubmit = handleSubmit(async (data) => {
    // let editInfo = {
    //   id: student.id,
    //   data: {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     identityNumber: data.identityNumber,
    //     birthDate: value as string,
    //     phoneNumber: data.phoneNumber,
    //   },
    // }
    try {
      await dispatch(
        editInfoStudent({
          id: student.id,
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            identityNumber: data.identityNumber,
            birthDate: value as string,
            phoneNumber: data.phoneNumber,
          },
        })
      )
      toast.success('Update succeed!')
    } catch (error) {
      toast.error(error as Error)
    } finally {
      handleClose()
    }
  })

  return (
    <Container maxWidth='sm' className={classes.modal}>
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
    </Container>
  )
}

export default EditStudentFormManagement
