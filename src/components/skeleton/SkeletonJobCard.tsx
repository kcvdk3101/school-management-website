import { Box, Card, CardContent, Divider, Skeleton } from '@mui/material'
import React from 'react'

type SkeletonJobCardProps = {}

const SkeletonJobCard: React.FC<SkeletonJobCardProps> = () => {
  return (
    <Card sx={{ display: 'flex', minHeight: 300 }}>
      <Skeleton sx={{ height: 120, width: 120, m: 2 }} animation='wave' variant='rectangular' />
      <CardContent style={{ flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Skeleton variant='text' sx={{ width: '100%', height: 30 }} />
          <Skeleton variant='text' sx={{ width: '100%', height: 30 }} />
          <Divider />
        </Box>
        <Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Skeleton variant='circular' width={30} height={30} />
            <Skeleton variant='text' sx={{ width: 100, height: 30, ml: 1 }} />
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <Skeleton variant='circular' width={30} height={30} />
            <Skeleton variant='text' sx={{ width: 100, height: 30, ml: 1 }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            my: 1,
          }}
        >
          <Skeleton variant='text' height={30} width={100} />
          <Skeleton variant='text' height={30} width={100} sx={{ ml: 1 }} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SkeletonJobCard
