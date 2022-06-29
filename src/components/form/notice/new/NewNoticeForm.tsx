import React from 'react'
import { TextField, Grid } from '@mui/material'
import { FormState, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Input = {
  title: string
  content: string
}

type NewNoticeFormProps = {
  register: UseFormRegister<Input>
  formState: FormState<Input>
}

const NewNoticeForm: React.FC<NewNoticeFormProps> = ({ register, formState: { errors } }) => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label={t('Title')}
          required
          fullWidth
          autoComplete='off'
          {...register('title')}
          error={Boolean(errors.title)}
          helperText={t(`${errors.title?.message ? errors.title?.message : ''}`)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t('Content')}
          required
          fullWidth
          autoComplete='off'
          multiline
          rows={10}
          {...register('content')}
          error={Boolean(errors.content)}
          helperText={t(`${errors.content?.message ? errors.content?.message : ''}`)}
        />
      </Grid>
    </Grid>
  )
}

export default NewNoticeForm
