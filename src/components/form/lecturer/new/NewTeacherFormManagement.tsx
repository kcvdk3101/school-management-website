import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Modal, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../../../../app/hooks'
import { addNewLecturer, getLecturers } from '../../../../features/teacher/teacherSlice'
import { TeacherModel } from '../../../../models/teacher.model'
import NewTeacherForm from './NewTeacherForm'

type NewTeacherFormManagementProps = {
  open: boolean
  handleClose: () => void
}

type Input = {
  lastName: string
  firstName: string
  email: string
  position: string
  department: string
  phoneNumber: string
}

const newTeacherSchema = yup.object({
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

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

const NewTeacherFormManagement: React.FC<NewTeacherFormManagementProps> = ({
  open,
  handleClose,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  let { search } = useLocation()

  let paginationQuery = queryString.parse(search)
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0

  const { register, handleSubmit, formState, resetField } = useForm<Input>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(newTeacherSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    let lectures: TeacherModel[] = []
    lectures.push({
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.lastName} ${data.firstName}`,
      email: data.email,
      position: data.position,
      department: data.department,
      phoneNumber: data.phoneNumber,
      studentAmount: 0,
      maximumStudentAmount: 0,
    })

    try {
      await dispatch(addNewLecturer(lectures))
      await dispatch(getLecturers(offset))
      toast.success('Add successfully!')
    } catch (error) {
      toast.error(error as Error)
    } finally {
      handleClose()
    }
  })

  return (
    <Modal open={open} onClose={handleClose}>
      <Container maxWidth='md' className={classes.modal}>
        <Paper
          sx={{
            p: 3,
          }}
        >
          <Typography variant='h6' sx={{ mb: 2 }}>
            {t('Lecturer information')}
          </Typography>
          <form onSubmit={onSubmit}>
            <NewTeacherForm
              register={register}
              formState={formState}
              handleClose={handleClose}
              resetField={resetField}
            />
          </form>
        </Paper>
      </Container>
    </Modal>
  )
}

export default NewTeacherFormManagement
