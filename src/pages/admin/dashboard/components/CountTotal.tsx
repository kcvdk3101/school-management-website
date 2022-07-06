import BackpackIcon from '@mui/icons-material/Backpack'
import { Box, Paper, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React from 'react'

type CountTotalProps = {
  title: string
  total: number
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

const CountTotal: React.FC<CountTotalProps> = ({ title, total }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.totalCount}>
      <Box className={classes.left}>
        <Typography variant='body1'>{title}</Typography>
        <Typography component='p' variant='h4'>
          {total}
        </Typography>
      </Box>
      <Box style={{ backgroundColor: red[100], padding: 16, borderRadius: '100%' }}>
        <BackpackIcon color='secondary' fontSize='large' />
      </Box>
    </Paper>
  )
}

export default CountTotal
