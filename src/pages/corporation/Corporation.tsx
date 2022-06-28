import React from 'react'
import { Grid, Container, Typography, Paper, Box, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useLocation } from 'react-router-dom'
import CorporationCard from '../../components/card/CorporationCard'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CustomSkillChip from '../../components/commons/CustomSkillChip'
import { Skill } from '../../models/skill.model'
import PaidIcon from '@mui/icons-material/Paid'
import CustomJobType from '../../components/commons/CustomJobType'

type CorporationProps = {}

const Corporation: React.FC<CorporationProps> = () => {
  const location: any = useLocation()
  const { corporation } = location.state

  console.log(corporation)

  return (
    <Container sx={{ my: 2, height: '100%' }}>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Paper sx={{ p: 2 }}>
            {/* <Grid container>
              <Grid item xs={12}>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='h4'>{job.title}</Typography>
                  <CustomJobType type='internship' />
                </Box>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item container spacing={1}>
                <Grid item xs={12}>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    {job.details.skill &&
                      job.details.skill.map((s: Skill, index: number) => (
                        <CustomSkillChip key={index} name={s.name} />
                      ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.item}>
                    <PaidIcon />
                    <Typography sx={{ ml: 1 }}>
                      {job.details.salary[0].gt} - {job.details.salary[0].lt}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.item}>
                    <LocationOnIcon />
                    <Typography sx={{ ml: 1 }}>
                      {job.details.location[0].details} {job.details.location[0].street}, Ward{' '}
                      {job.details.location[0].ward}, District {job.details.location[0].district}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid item>
                <Divider sx={{ my: 2 }} />
                <Typography>{job.description}</Typography>
              </Grid>
            </Grid> */}
          </Paper>
        </Grid>
        {/* <Grid item xs={5}>
          <CorporationCard corporation={job.details.corporation[0]} />
        </Grid> */}
      </Grid>
    </Container>
  )
}

export default Corporation
