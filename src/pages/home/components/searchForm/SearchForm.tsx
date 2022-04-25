import SearchIcon from '@mui/icons-material/Search'
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import CustomButon from '../../../../components/commons/CustomButon'
import Provinces from '../../../../constants/provinces'

type FieldProps = {
  kw: string
  location: string
}

type SearchFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  register: UseFormRegister<FieldProps>
  formState: FormState<FieldProps>
  city: string
  handleChange: (e: SelectChangeEvent<string>) => void
}

const useStyles = makeStyles({
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
})

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  register,
  formState: { errors },
  city,
  handleChange,
}) => {
  const classes = useStyles()

  // const handleChangeProvice = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setProvices(event.target.value)
  // }

  return (
    <Grid item xs={12}>
      <Box component='form' className={classes.box} padding={2} onSubmit={onSubmit}>
        <Grid container justifyContent='center' spacing={2}>
          {/* Search Form */}
          <Grid item xs={4}>
            <TextField
              label='Keyword'
              autoFocus
              required
              fullWidth
              {...register('kw')}
              helperText={errors.kw?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              margin='none'
              fullWidth
              id='demo-simple-select'
              value={city}
              label='City'
              onChange={handleChange}
            >
              {Provinces.map((provice) => (
                <MenuItem key={provice.value} value={provice.value}>
                  {provice.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <CustomButon
              color='primary'
              sz='large'
              variant='contained'
              type='submit'
              label={<SearchIcon />}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default SearchForm
