import { Box, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

type CountTotalProps = {
  bgColor: string
  title: string
  total: number
  icon: React.ReactNode
}

const useStyles = makeStyles({
  totalCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const CountTotal: React.FC<CountTotalProps> = ({ bgColor, title, total, icon }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.totalCount} style={{ backgroundColor: bgColor }}>
      <Box className={classes.left}>
        <Typography variant='body1' color='white'>
          {title}
        </Typography>
        <Typography variant='h4' color='white'>
          {total}
        </Typography>
      </Box>
      <Box>{icon}</Box>
    </Paper>
  )
}

export default CountTotal
