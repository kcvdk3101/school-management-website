import SearchIcon from '@mui/icons-material/Search'
import { Box, Grid, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CustomButon from '../../../../components/commons/CustomButon'

type FieldProps = {
  jobTitle: string
}

type SearchFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  register: UseFormRegister<FieldProps>
  formState: FormState<FieldProps>
}

const useStyles = makeStyles({
  box: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
})

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, register, formState: { errors } }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid item container xs={12}>
      <Box component='form' className={classes.box} padding={2} onSubmit={onSubmit}>
        <Grid container justifyContent='center' spacing={2}>
          {/* Search Form */}
          <Grid item xs={10}>
            <TextField
              label={t('Job')}
              placeholder={t('Searching job')}
              autoFocus
              required
              fullWidth
              {...register('jobTitle')}
              helperText={errors.jobTitle?.message}
            />
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
