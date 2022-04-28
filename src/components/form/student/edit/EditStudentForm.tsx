import { Button, Grid, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useState } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { StudentModel } from '../../../../models'

type EditStudentFormProps = {
  register: UseFormRegister<StudentModel>
  formState: FormState<StudentModel>
  student: StudentModel
  handleClose: () => void
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({
  register,
  formState: { errors },
  student,
  handleClose,
}) => {
  // const classes = useStyles()
  const [value, setValue] = useState<string | Date | null>(null)
  console.log(value)

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
          label='email'
          required
          fullWidth
          defaultValue={student.email}
          {...register('email')}
          helperText={errors.email?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='birdDate'
            value={student.birthDate}
            onChange={(newValue) => {
              setValue(newValue)
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
        <Button type='submit' variant='contained' sx={{ ml: 1 }} disabled={true}>
          Edit
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditStudentForm
