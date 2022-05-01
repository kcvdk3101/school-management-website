import { Button, Grid, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { FormState, UseFormRegister, UseFormReset } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StudentModel } from '../../../../models'

type Input = {
  lastName: string
  firstName: string
  address: string
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
  const { t } = useTranslation()

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label={t('Last name')}
          required
          fullWidth
          defaultValue={student.lastName}
          {...register('lastName')}
          helperText={errors.lastName?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={t('First name')}
          required
          fullWidth
          defaultValue={student.firstName}
          {...register('firstName')}
          helperText={errors.firstName?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t('Birthday')}
            value={value}
            onChange={(newValue) => {
              handleChangeValue(newValue)
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={t('Phone')}
          required
          fullWidth
          defaultValue={student.phoneNumber}
          {...register('phoneNumber')}
          helperText={errors.phoneNumber?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t('Address')}
          required
          fullWidth
          defaultValue={student.address}
          {...register('address')}
          helperText={errors.address?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type='button' variant='outlined' color='secondary' onClick={handleClose}>
          {t('Cancel')}
        </Button>
        <Button type='submit' variant='contained' sx={{ ml: 1 }} disabled={isSubmitting}>
          {t('Edit')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditStudentForm
