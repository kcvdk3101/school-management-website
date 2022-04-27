import { Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

type CustomSkillChipProps = {
  name: string
}

const useStyles = makeStyles({
  container: {
    border: '1px solid black',
    padding: '4px 12px',
    marginRight: '4px',
    borderRadius: '4px',
    '&:hover': {
      border: '1px solid #e53935',
      color: '#e53935',
    },
  },
})

const CustomSkillChip: React.FC<CustomSkillChipProps> = ({ name }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Typography>{name}</Typography>
    </Box>
  )
}

export default CustomSkillChip
