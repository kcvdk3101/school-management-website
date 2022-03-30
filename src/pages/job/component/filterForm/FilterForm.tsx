import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import CustomButon from '../../../../components/commons/CustomButon'
import Provinces from '../../../../utils/provinces'

type FilterFormProps = {}

const useStyles = makeStyles({
  box: {
    // background: 'linear-gradient(180deg, #f05742 0%, #f05742 50%, #e53935 80%)',
    borderRadius: 10,
  },
})

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const FilterForm: React.FC<FilterFormProps> = () => {
  const classes = useStyles()

  const [provices, setProvices] = useState('')

  const handleChangeProvice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvices(event.target.value)
  }

  const [personName, setPersonName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <Grid item xs={12}>
      <Paper component='form' className={classes.box}>
        <Grid container justifyContent='center'>
          {/* Search Form */}
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
          <Grid
            item
            xs={4}
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
          <Grid item>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id='demo-multiple-chip-label'>Chip</InputLabel>
              <Select
                labelId='demo-multiple-chip-label'
                id='demo-multiple-chip'
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default FilterForm
