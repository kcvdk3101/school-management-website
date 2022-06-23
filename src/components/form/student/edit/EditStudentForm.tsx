import { Button, Grid, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StudentModel } from '../../../../models/student.model'

type Input = {
  lastName: string
  firstName: string
  address: string
  phoneNumber: string
  class: string
}

type EditStudentFormProps = {
  register: UseFormRegister<Input>
  formState: FormState<Input>
  student: StudentModel
  value: string | null
  status: string
  handleClose: () => void
  handleChangeValue: (value: string | null) => void
  handleChangeStatus: (event: SelectChangeEvent) => void
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({
  register,
  formState: { errors, isSubmitting },
  student,
  value,
  status,
  handleClose,
  handleChangeValue,
  handleChangeStatus,
}) => {
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
          error={Boolean(errors.lastName)}
          helperText={t(`${errors.lastName?.message ? errors.lastName?.message : ''}`)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={t('First name')}
          required
          fullWidth
          defaultValue={student.firstName}
          {...register('firstName')}
          error={Boolean(errors.firstName)}
          helperText={t(`${errors.firstName?.message ? errors.firstName?.message : ''}`)}
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
          error={Boolean(errors.phoneNumber)}
          helperText={t(`${errors.phoneNumber?.message ? errors.phoneNumber?.message : ''}`)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label={t('Class')}
          required
          fullWidth
          defaultValue={student.class}
          {...register('class')}
          error={Boolean(errors.class)}
          helperText={t(`${errors.class?.message ? errors.class?.message : ''}`)}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{t('Status')}</InputLabel>
          <Select value={status} label='Age' onChange={handleChangeStatus}>
            <MenuItem value='Chưa thực tập'>{t("Haven't practiced")}</MenuItem>
            <MenuItem value='Đang thực tập'>{t('Practicing')}</MenuItem>
            <MenuItem value='Đã thực tập'>{t('Trained')}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={t('Address')}
          required
          fullWidth
          defaultValue={student.address}
          {...register('address')}
          error={Boolean(errors.address)}
          helperText={t(`${errors.address?.message ? errors.address?.message : ''}`)}
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
