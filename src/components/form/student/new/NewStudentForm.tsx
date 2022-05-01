import React from 'react'
import { Grid, TextField, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { FormState, UseFormRegister, UseFormResetField } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useTranslation } from 'react-i18next'

type Input = {
  lastName: string
  firstName: string
  identityNumber: string
  address: string
  phoneNumber: string
  class: string
}

type NewStudentFormProps = {
  birth: string | null
  register: UseFormRegister<Input>
  resetField: UseFormResetField<Input>
  formState: FormState<Input>
  handleClose: () => void
  handleChangeBirth: (value: string | null) => void
}

const NewStudentForm: React.FC<NewStudentFormProps> = ({
  resetField,
  birth,
  register,
  formState: { errors },
  handleClose,
  handleChangeBirth,
}) => {
  const { t } = useTranslation()

  return (
    <Grid container columnSpacing={6} rowSpacing={3}>
      <Grid item xs={6} container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label={t('Last name')}
            required
            fullWidth
            autoComplete='off'
            {...register('lastName')}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t('First name')}
            required
            fullWidth
            autoComplete='off'
            {...register('firstName')}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t('Identity number')}
            required
            fullWidth
            autoComplete='off'
            {...register('identityNumber')}
            error={Boolean(errors.identityNumber)}
            helperText={errors.identityNumber?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t('Phone')}
            required
            fullWidth
            autoComplete='off'
            {...register('phoneNumber')}
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />
        </Grid>
      </Grid>
      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label={t('Class')}
            required
            fullWidth
            autoComplete='off'
            {...register('class')}
            error={Boolean(errors.class)}
            helperText={errors.class?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label={t('Address')}
            required
            fullWidth
            autoComplete='off'
            {...register('address')}
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={t('Birthday')}
              value={birth}
              onChange={(newValue) => {
                handleChangeBirth(newValue)
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Button
          type='button'
          variant='outlined'
          color='secondary'
          onClick={() => {
            handleClose()
            resetField('firstName')
            resetField('lastName')
            resetField('address')
            resetField('identityNumber')
            resetField('phoneNumber')
            resetField('class')
          }}
        >
          {t('Cancel')}
        </Button>
        <Button type='submit' variant='contained' sx={{ ml: 1 }}>
          {t('Save')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default NewStudentForm
