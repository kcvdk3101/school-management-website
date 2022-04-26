import { Box, Card, CardContent, Divider, Skeleton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

type SkeletonJobCardLargeProps = {}

const useStyles = makeStyles({
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
})

const SkeletonJobCardLarge: React.FC<SkeletonJobCardLargeProps> = () => {
  const classes = useStyles()

  return (
    <Card sx={{ display: 'flex' }}>
      <Skeleton sx={{ height: 200, width: 200, m: 2 }} animation='wave' variant='rectangular' />
      <CardContent style={{ flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant='text' sx={{ width: '80%', height: 60 }} />
          <Skeleton variant='text' sx={{ width: '50%', height: 40 }} />
          <Divider />
          <Divider />
        </Box>
        <Box component='div' className={classes.itemContainer}>
          <Box className={classes.item}>
            <Skeleton variant='circular' width={30} height={30} />
            <Skeleton variant='text' sx={{ width: 100, height: 30, ml: 1 }} />
          </Box>
          <Box className={classes.item}>
            <Skeleton variant='circular' width={30} height={30} />
            <Skeleton variant='text' sx={{ width: 100, height: 30, ml: 1 }} />
          </Box>
          <Box className={classes.item}>
            <Skeleton variant='circular' width={30} height={30} />
            <Skeleton variant='text' sx={{ width: 100, height: 30, ml: 1 }} />
          </Box>
          <Skeleton variant='text' height={40} width={100} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SkeletonJobCardLarge
