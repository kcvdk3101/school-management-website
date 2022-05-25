import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Modal, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import queryString from 'query-string'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../../../../app/hooks'
import { API_UNIVERSITY_URL } from '../../../../constants'
import { addNewStudent, getStudents } from '../../../../features/student/studentsSlice'
import { StudentModel } from '../../../../models'
import NewStudentForm from './NewStudentForm'

type NewStudentFormManagementProps = {
  open: boolean
  handleClose: () => void
}

type Input = {
  lastName: string
  firstName: string
  identityNumber: string
  address: string
  class: string
  phoneNumber: string
}

const newStudentSchema = yup.object({
  lastName: yup.string().trim().required('This field is required'),
  firstName: yup.string().trim().required('This field is required'),
  identityNumber: yup
    .string()
    .trim()
    .matches(/^[0-9][0-9]+DH[0-9][0-9][0-9][0-9][0-9][0-9]$/, 'Identity number is invalid')
    .test(
      'checkIdentityNumberLength',
      'Identity number is invalid',
      (val) => val?.toString().length === 10
    )
    .test('checkDuplicateIdentityNumber', 'Identity number has existed', async (value) => {
      const { data } = await axios.get(`${API_UNIVERSITY_URL}/university/student/IdentityNumber`)
      let checkDuplicate = data.findIndex((element: { MSSV: string }) => element.MSSV === value)
      if (checkDuplicate > -1) {
        return false
      }
      return true
    })
    .required('This field is required'),
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
})

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

const NewStudentFormManagement: React.FC<NewStudentFormManagementProps> = ({
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
    resolver: yupResolver(newStudentSchema),
  })

  const [birth, setBirth] = useState<string | null>('')

  const handleChangeBirth = (value: string | null) => {
    setBirth(value)
  }

  const onSubmit = handleSubmit(async (data) => {
    let students: StudentModel[] = []
    students.push({
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.lastName} ${data.firstName}`,
      birthDate: birth as string,
      identityNumber: data.identityNumber,
      address: data.address,
      phoneNumber: data.phoneNumber,
      class: data.class,
      status: 'Chưa thực tập',
    })

    try {
      await dispatch(addNewStudent(students))
      await dispatch(getStudents(offset))
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
            {t('Student information')}
          </Typography>
          <form onSubmit={onSubmit}>
            <NewStudentForm
              register={register}
              formState={formState}
              handleClose={handleClose}
              birth={birth}
              resetField={resetField}
              handleChangeBirth={handleChangeBirth}
            />
          </form>
        </Paper>
      </Container>
    </Modal>
  )
}

export default NewStudentFormManagement
