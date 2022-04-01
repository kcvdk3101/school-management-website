import { Grid, MenuItem, Paper, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import Majors from '../../../../utils/majors'
import Provinces from '../../../../utils/provinces'

type FilterFormProps = {}

const useStyles = makeStyles({
  box: {
    // background: 'linear-gradient(180deg, #f05742 0%, #f05742 50%, #e53935 80%)',
    borderRadius: 10,
  },
})

const FilterForm: React.FC<FilterFormProps> = () => {
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
      <Paper component='form' className={classes.box}>
        <Grid container justifyContent='center' spacing={2}>
          {/* Search Form */}
          <Grid item xs={3}>
            <TextField
              margin='normal'
              fullWidth
              autoFocus
              required
              placeholder='Type keyword'
              id='keyword'
              name='keyword'
              color='secondary'
            />
          </Grid>
          <Grid item xs={3}>
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
          {/* Filter Form */}

          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              placeholder='Type keyword'
              id='name'
              name='name'
              autoFocus
              color='secondary'
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
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
        </Grid>
      </Paper>
    </Grid>
  )
}

export default FilterForm
