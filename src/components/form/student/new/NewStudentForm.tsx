import React from 'react'
import { Grid, TextField, Button, FormControl } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { FormState, UseFormRegister } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

type Input = {
  lastName: string
  firstName: string
  identityNumber: string
  address: string
  phoneNumber: string
}

type NewStudentFormProps = {
  classSelection: string
  register: UseFormRegister<Input>
  formState: FormState<Input>
  handleClose: () => void
}

const NewStudentForm: React.FC<NewStudentFormProps> = ({
  classSelection,
  register,
  formState: { errors },
  handleClose,
}) => {
  return (
    <Grid container columnSpacing={6} rowSpacing={3}>
      <Grid item xs={6} container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label='lastName'
            required
            fullWidth
            // defaultValue={student.lastName}
            {...register('lastName')}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='firstName'
            required
            fullWidth
            // defaultValue={student.firstName}
            {...register('firstName')}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='identityNumber'
            required
            fullWidth
            // defaultValue={student.identityNumber}
            {...register('identityNumber')}
            // helperText={errors.identityNumber?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='phoneNumber'
            required
            fullWidth
            // defaultValue={student.phoneNumber}
            {...register('phoneNumber')}
            // helperText={errors.phoneNumber?.message}
          />
        </Grid>
      </Grid>
      <Grid item xs={6} container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Select Class</InputLabel>
            <Select
              value={classSelection}
              label='Select Class'
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='address'
            required
            fullWidth
            // defaultValue={student.identityNumber}
            {...register('address')}
            // helperText={errors.identityNumber?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='birdDate'
              value={new Date().getDate()}
              onChange={(newValue) => {
                console.log(newValue)
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Button type='button' variant='outlined' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button type='submit' variant='contained' sx={{ ml: 1 }}>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}

export default NewStudentForm
