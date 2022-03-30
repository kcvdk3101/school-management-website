import SearchIcon from '@mui/icons-material/Search'
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import CustomButon from '../../../../components/commons/CustomButon'
import Majors from '../../../../utils/majors'
import Provinces from '../../../../utils/provinces'

type SearchFormProps = {}

const useStyles = makeStyles({
  box: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
})

const SearchForm: React.FC<SearchFormProps> = () => {
  const classes = useStyles()

  const [provices, setProvices] = useState('')
  const [major, setMajor] = useState('')

  const handleChangeProvice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvices(event.target.value)
  }

  const handleChangeMajor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMajor(event.target.value)
  }

  return (
    <Grid item xs={12}>
      <Box component='form' className={classes.box} padding={2}>
        <Grid container justifyContent='center' spacing={2}>
          {/* Search Form */}
          <Grid item xs={4}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Email Address'
              id='email'
              name='email'
              autoComplete='email'
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='normal'
              fullWidth
              select
              id='city'
              name='city'
              label='Choose your city'
              value={provices}
              onChange={handleChangeProvice}
            >
              {Provinces.map((provice) => (
                <MenuItem key={provice.value} value={provice.value}>
                  {provice.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              margin='normal'
              fullWidth
              select
              id='major'
              name='major'
              label='Choose major'
              value={major}
              onChange={handleChangeMajor}
            >
              {Majors.map((major) => (
                <MenuItem key={major.value} value={major.value}>
                  {major.label}
                </MenuItem>
              ))}
            </TextField>
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
              label={<SearchIcon />}
              handleOnClick={() => console.log('Clicked')}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default SearchForm
