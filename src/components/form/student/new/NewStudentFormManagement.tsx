import React, { useState } from 'react'
import { Modal, Container, Paper, Typography } from '@mui/material'
import NewStudentForm from './NewStudentForm'
import { makeStyles } from '@mui/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../../app/hooks'
import { toast } from 'react-toastify'
import { getStudents } from '../../../../features/student/studentsSlice'

type NewStudentFormManagementProps = {
  open: boolean
  handleClose: () => void
}

type Input = {
  lastName: string
  firstName: string
  identityNumber: string
  address: string
  phoneNumber: string
}

const newStudentSchema = yup
  .object({
    lastName: yup.string().trim(),
    firstName: yup.string().trim(),
    identityNumber: yup.string().trim(),
    address: yup.string().trim(),
    phoneNumber: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid'
      ),
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
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState } = useForm<Input>({
    resolver: yupResolver(newStudentSchema),
  })

  const [classSelection, setClassSelection] = useState<string>('')

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(getStudents(0))
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
            Student Information
          </Typography>
          <form onSubmit={onSubmit}>
            <NewStudentForm
              classSelection={classSelection}
              register={register}
              formState={formState}
              handleClose={handleClose}
              // student={student}
              // value={value}
              // handleChangeValue={handleChangeValue}
            />
          </form>
        </Paper>
      </Container>
    </Modal>
  )
}

export default NewStudentFormManagement
