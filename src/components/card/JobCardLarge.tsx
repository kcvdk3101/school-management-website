import React from 'react'
import { Box, Card, CardContent, CardMedia, Typography, Divider } from '@mui/material'
import PaidIcon from '@mui/icons-material/Paid'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CustomJobType from '../commons/CustomJobType'
import DnsIcon from '@mui/icons-material/Dns'
import { JobModel } from '../../models'
import { makeStyles } from '@mui/styles'

type JobCardLargeProps = {
  job: JobModel
}

const useStyles = makeStyles({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
})

const JobCardLarge: React.FC<JobCardLargeProps> = ({ job }) => {
  const classes = useStyles()

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component='img'
        sx={{ width: 200, height: 200, m: 2 }}
        src='https://picsum.photos/200'
        alt='Live from space album cover'
      />
      <CardContent style={{ flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h4'>{job.title}</Typography>
          <Typography variant='h6' color='text.secondary' component='div' sx={{ mt: 1 }}>
            @{job.details.corporation[0].name}
          </Typography>
          <Divider />
        </Box>
        <Box component='div' className={classes.itemContainer}>
          <Box className={classes.item}>
            <PaidIcon htmlColor='#ef7861' />
            <Typography sx={{ ml: 1 }}>
              {job.details.salary[0].gt} - {job.details.salary[0].lt}
            </Typography>
          </Box>
          <Box className={classes.item}>
            <LocationOnIcon htmlColor='#2ccf60' />
            <Typography sx={{ ml: 1 }}>
              {job.details.location[0].city} {job.details.location[0].country}
            </Typography>
          </Box>
          <Box className={classes.item}>
            <DnsIcon htmlColor='#43ade6' />
            <Typography sx={{ ml: 1 }}>{job.details.corporation[0].special}</Typography>
          </Box>
          <CustomJobType type='internship' />
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobCardLarge
