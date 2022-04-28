import { makeStyles } from '@mui/styles'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Paper, Typography } from '@mui/material'
import EditStudentForm from './EditStudentForm'
import { StudentModel } from '../../../../models'
import { useTranslation } from 'react-i18next'

type EditStudentFormManagementProps = {
  student: StudentModel
  handleClose: () => void
}

type Input = StudentModel

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

const EditStudentFormManagement: React.FC<EditStudentFormManagementProps> = ({
  student,
  handleClose,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { register, handleSubmit, formState } = useForm<Input>()

  const onSubmit = (data: StudentModel) => console.log(data)

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <EditStudentForm
            register={register}
            formState={formState}
            student={student}
            handleClose={handleClose}
          />
        </form>
      </Paper>
    </Container>
  )
}

export default EditStudentFormManagement
