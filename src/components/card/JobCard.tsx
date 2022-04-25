import { Box, Card, CardContent, CardMedia, Typography, Divider, Skeleton } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import React from 'react'
import CustomJobType from '../commons/CustomJobType'
import { JobModel } from '../../models'

type JobCardProps = {
  job: JobModel
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  console.log(job)
  return (
    <Card sx={{ display: 'flex', minHeight: 300 }}>
      <CardMedia
        component='img'
        sx={{ width: 120, height: 120, m: 2 }}
        src='https://picsum.photos/200'
        alt='Live from space album cover'
      />
      <CardContent style={{ flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>{job.title}</Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            @{job.details.corporation[0].name}
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
            <Typography sx={{ ml: 1 }}>
              {job.details.salary[0].gt} - {job.details.salary[0].lt}
            </Typography>
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
            <Typography sx={{ ml: 1 }}>
              {job.details.location[0].city} {job.details.location[0].country}
            </Typography>
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
          <CustomJobType type='internship' />
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobCard
