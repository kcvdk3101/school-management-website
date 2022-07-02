import React from 'react'
import { Grid, TextField, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormState, UseFormRegister, UseFormResetField } from 'react-hook-form'

type NewTeacherFormProps = {
  register: UseFormRegister<Input>
  resetField: UseFormResetField<Input>
  formState: FormState<Input>
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

const NewTeacherForm: React.FC<NewTeacherFormProps> = ({
  resetField,
  register,
  formState: { errors },
  handleClose,
}) => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item container spacing={3} xs={12}>
        <Grid item xs={6}>
          <TextField
            label={t('Last name')}
            required
            fullWidth
            autoComplete='off'
            {...register('lastName')}
            error={Boolean(errors.lastName)}
            helperText={t(`${errors.lastName?.message ? errors.lastName?.message : ''}`)}
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
            helperText={t(`${errors.firstName?.message ? errors.firstName?.message : ''}`)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t('Email')}
            required
            fullWidth
            autoComplete='off'
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={t(`${errors.email?.message ? errors.email?.message : ''}`)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t('Phone')}
            required
            fullWidth
            autoComplete='off'
            {...register('phoneNumber')}
            error={Boolean(errors.phoneNumber)}
            helperText={t(`${errors.phoneNumber?.message ? errors.phoneNumber?.message : ''}`)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={t('Position')}
            required
            fullWidth
            autoComplete='off'
            {...register('position')}
            error={Boolean(errors.position)}
            helperText={t(`${errors.position?.message ? errors.position?.message : ''}`)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label={t('Department')}
            required
            fullWidth
            autoComplete='off'
            {...register('department')}
            error={Boolean(errors.department)}
            helperText={t(`${errors.department?.message ? errors.department?.message : ''}`)}
          />
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
            resetField('email')
            resetField('position')
            resetField('department')
            resetField('phoneNumber')
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

export default NewTeacherForm
