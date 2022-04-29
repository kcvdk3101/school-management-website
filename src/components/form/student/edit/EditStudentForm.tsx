import { Button, Grid, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { StudentModel } from '../../../../models'

type Input = {
  lastName: string
  firstName: string
  identityNumber: string
  phoneNumber: string
}

type EditStudentFormProps = {
  register: UseFormRegister<Input>
  formState: FormState<Input>
  student: StudentModel
  value: string | null
  handleClose: () => void
  handleChangeValue: (value: string | null) => void
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({
  register,
  formState: { errors, isSubmitting },
  student,
  value,
  handleClose,
  handleChangeValue,
}) => {
  // const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label='lastName'
          required
          fullWidth
          defaultValue={student.lastName}
          {...register('lastName')}
          helperText={errors.lastName?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label='firstName'
          required
          fullWidth
          defaultValue={student.firstName}
          {...register('firstName')}
          helperText={errors.firstName?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='identityNumber'
          required
          fullWidth
          defaultValue={student.identityNumber}
          {...register('identityNumber')}
          helperText={errors.identityNumber?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='birdDate'
            value={value}
            onChange={(newValue) => {
              handleChangeValue(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label='phoneNumber'
          required
          fullWidth
          defaultValue={student.phoneNumber}
          {...register('phoneNumber')}
          helperText={errors.phoneNumber?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type='button' variant='outlined' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button type='submit' variant='contained' sx={{ ml: 1 }} disabled={isSubmitting}>
          Edit
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditStudentForm
