import { Box, Grid, Chip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

type ListChipReportProps = {}

const useStyles = makeStyles({
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
})

const ListChipReport: React.FC<ListChipReportProps> = () => {
  const classes = useStyles()

  return (
    <Box component='div' className={classes.innerContainer}>
      <Grid container spacing={1}>
        <Grid item>
          <Chip color='warning' variant='outlined' label='Chưa thực tập (150)' />
        </Grid>
        <Grid item>
          <Chip color='info' variant='outlined' label='Đang thực tập (150)' />
        </Grid>
        <Grid item>
          <Chip color='success' variant='outlined' label='Đã thực tập (150)' />
        </Grid>
        <Grid item>
          <Chip color='error' variant='outlined' label='Chưa có GVHD (150)' />
        </Grid>
        <Grid item>
          <Chip color='success' variant='outlined' label='Đã có GVHD (150)' />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ListChipReport
