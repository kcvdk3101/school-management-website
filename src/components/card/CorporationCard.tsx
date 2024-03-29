import { Box, Typography, Paper, Card, CardMedia, CardContent, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import GroupIcon from '@mui/icons-material/Group'
import Dns from '@mui/icons-material/Dns'
import { CorporationModel } from '../../models/corporation.model'
import { Link } from 'react-router-dom'

type CorporationCardProps = {
  corporation: CorporationModel
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  corpName: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: '#e53935',
    },
  },
})

const CorporationCard: React.FC<CorporationCardProps> = ({ corporation }) => {
  const classes = useStyles()

  return (
    <Paper>
      <Card className={classes.container}>
        <CardMedia
          component='img'
          sx={{ width: 150, height: 150, borderRadius: 2 }}
          src='https://picsum.photos/200'
          alt='Live from space album cover'
        />
        <CardContent>
          <Box>
            <Link
              className={classes.link}
              to={`/corporation/${corporation.id}`}
              state={{ corporation: corporation }}
            >
              <Typography variant='h6' className={classes.corpName} fontWeight={600}>
                {corporation.name}
              </Typography>
            </Link>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box className={classes.item}>
                  <EmailIcon />
                  <Typography sx={{ ml: 1 }}>{corporation.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.item}>
                  <LocalPhoneIcon />
                  <Typography sx={{ ml: 1 }}>{corporation.hotline}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.item}>
                  <GroupIcon />
                  <Typography sx={{ ml: 1 }}>{corporation.numberEmployees}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.item}>
                  <Dns />
                  <Typography sx={{ ml: 1 }}>{corporation.special}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className={classes.item}>
                  <EmailIcon />
                  <Typography sx={{ ml: 1 }}>{corporation.overtimeRequire}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default CorporationCard
