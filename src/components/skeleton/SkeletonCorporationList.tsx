import React from 'react'
import { Grid, Card, Box, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'

type Props = {}

const useStyles = makeStyles({
  card: { height: 280, width: 350, padding: 8 },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

const SkeletonCorporationList = (props: Props) => {
  const classes = useStyles()

  return (
    <Grid container spacing={4}>
      {Array.from({ length: 8 }).map((_, idx) => (
        <Grid item xs={3} key={idx}>
          <Card className={classes.card}>
            <Box className={classes.head}>
              <Skeleton variant='circular' width={60} height={50} />
              <Box style={{ width: '100%', marginLeft: 16 }}>
                <Skeleton variant='text' width='100%' height={30} />
                <Skeleton variant='text' width='70%' height={30} />
              </Box>
            </Box>
            <Skeleton animation='wave' width='100%' height={250} />
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default SkeletonCorporationList
