import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import CustomButon from '../../../../components/commons/CustomButon'
import Levels from '../../../../constants/levels'
import Provinces from '../../../../constants/provinces'

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
  const [levels, setLevels] = useState('')

  const handleChangeProvice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvices(event.target.value)
  }

  const handleChangeLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevels(event.target.value)
  }

  return (
    <Grid item xs={12}>
      <Box component='form' className={classes.box}>
        <Grid container justifyContent='flex-start' spacing={2}>
          {/* Search Form */}
          {/* <Grid item xs={3}>
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
          </Grid> */}
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
              id='level'
              name='level'
              label='Choose level'
              value={levels}
              onChange={handleChangeLevel}
            >
              {Levels.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* <Grid item xs={4}>
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
          </Grid> */}

          {/* Filter Form */}
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              margin='normal'
              placeholder='Type keyword'
              id='name'
              name='name'
              autoFocus
              color='secondary'
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
              label={<FilterAltIcon />}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default FilterForm
