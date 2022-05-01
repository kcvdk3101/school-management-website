import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Modal, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../../../../app/hooks'
import { addNewStudent } from '../../../../features/student/studentsSlice'
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

const newStudentSchema = yup
  .object({
    lastName: yup.string().trim(),
    firstName: yup.string().trim(),
    identityNumber: yup
      .string()
      .trim()
      .test(
        'checkIdentityNumberLength',
        'Must be exactly 10 characters',
        (val) => val?.toString().length === 10
      )
      .matches(/^[0-9][0-9]+DH[0-9][0-9][0-9][0-9][0-9][0-9]$/, 'Identity mumber is invalid'),
    address: yup.string().trim(),
    phoneNumber: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is invalid'
      ),
    class: yup
      .string()
      .test(
        'checkClassLength',
        'Must be exactly 6 characters',
        (val) => val?.toString().length === 6
      )
      .test('checkValidClass', 'Class is invalid', function (value) {
        if (value?.startsWith('AN') || value?.startsWith('PM') || value?.startsWith('TT')) {
          return true
        }
        return false
      }),
  })
  .required('This field is required')

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

  const { register, handleSubmit, formState, resetField } = useForm<Input>({
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
      birthDate: birth as string,
      identityNumber: data.identityNumber,
      address: data.address,
      phoneNumber: data.phoneNumber,
      class: data.class,
      status: 'Chưa thực tập',
    })

    try {
      const response = await dispatch(addNewStudent(students))
      console.log(response)
      // await dispatch(getStudents(0))
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
