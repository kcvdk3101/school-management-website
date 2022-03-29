import { Box, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import React from 'react'
import CustomJobType from '../commons/CustomJobType'

type JobCardProps = {}

const JobCard: React.FC<JobCardProps> = () => {
  return (
    <Card sx={{ display: 'flex', minHeight: 300 }}>
      <CardMedia
        component='img'
        sx={{ width: 120, height: 120, m: 2 }}
        src='https://picsum.photos/200'
        alt='Live from space album cover'
      />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>
            Thực Tập Sinh “The Apprentice Program” Mùa Hè 2022 (31/3/2022)
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            @Shopee
          </Typography>
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
            <PaidIcon htmlColor='#ef7861' />
            <Typography sx={{ ml: 1 }}>Deal</Typography>
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
            <LocationOnIcon htmlColor='#2ccf60' />
            <Typography sx={{ ml: 1 }}>Ho Chi Minh City</Typography>
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
          <CustomJobType type='fulltime' />
          <CustomJobType type='internship' />
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobCard
