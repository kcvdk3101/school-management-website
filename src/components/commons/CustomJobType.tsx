import React from 'react'
import { Box, Typography } from '@mui/material'

type CustomJobTypeProps = {
  type: 'fulltime' | 'internship'
}

const CustomJobType: React.FC<CustomJobTypeProps> = ({ type }) => {
  return (
    <Box
      component='div'
      maxWidth='fit-content'
      sx={{
        px: 2,
        py: 0.5,
        border: 2,
        borderRadius: 10,
        boxShadow: 1,
        borderColor: type === 'fulltime' ? 'green' : 'red',
        marginRight: 1,
        marginBottom: 1,
      }}
    >
      <Typography
        variant='subtitle2'
        fontWeight={600}
        color={type === 'fulltime' ? 'green' : 'red'}
      >
        {type === 'fulltime' ? 'Fulltime' : 'Internship'}
      </Typography>
    </Box>
  )
}

export default CustomJobType
