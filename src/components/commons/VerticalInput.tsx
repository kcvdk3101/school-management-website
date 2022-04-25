import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'
import { TextField } from '@mui/material'

type VerticalInputProps = {}

const VerticalInput: React.FC<VerticalInputProps> = () => {
  return (
    <FormControl variant='standard' fullWidth margin='normal'>
      <InputLabel htmlFor='component-simple'>Name</InputLabel>
      <TextField id='component-simple' type='text' />
      {/* <FormHelperText id='component-error-text'>Error</FormHelperText> */}
    </FormControl>
  )
}

export default VerticalInput
