import React from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { LecturerModel } from '../../../../models'
import { Button, Grid, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

type EditLecturerFormProps = {
  register: UseFormRegister<Input>
  formState: FormState<Input>
  lecturer: LecturerModel
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

const EditLecturerForm: React.FC<EditLecturerFormProps> = ({
  register,
  formState: { errors, isSubmitting },
  lecturer,
  handleClose,
}) => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label={t('Last name')}
          required
          fullWidth
          defaultValue={lecturer.lastName}
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
          defaultValue={lecturer.firstName}
          {...register('firstName')}
          error={Boolean(errors.firstName)}
          helperText={t(`${errors.firstName?.message ? errors.firstName?.message : ''}`)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={t('Phone')}
          required
          fullWidth
          defaultValue={lecturer.phoneNumber}
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
          defaultValue={lecturer.position}
          {...register('position')}
          error={Boolean(errors.position)}
          helperText={t(`${errors.position?.message ? errors.position?.message : ''}`)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t('Department')}
          required
          fullWidth
          defaultValue={lecturer.department}
          {...register('department')}
          error={Boolean(errors.department)}
          helperText={t(`${errors.department?.message ? errors.department?.message : ''}`)}
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

export default EditLecturerForm
