import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import JobCardLarge from '../../components/card/JobCardLarge'
import SkeletonJobCardLarge from '../../components/skeleton/SkeletonJobCardLarge'
import { getJobs, getJobsByTitle } from '../../features/job/jobSlice'
import FilterFormManagement from './component/filterForm/FilterFormManagement'

type JobProps = {}

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
  headingContainer: {
    marginTop: 28,
    marginBottom: 28,
  },
})

const Job: React.FC<JobProps> = () => {
  const classes = useStyles()
  const { search } = useLocation()

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  let query = queryString.parse(search)
  const limit = query.limit ? +query.limit : 0
  const offset = query.offset ? +query.offset : 0
  const title = query.title ? (query.title as string) : ''

  const fetchingJob = useAppSelector((state) => state.jobs.fetchingJob)
  const jobs = useAppSelector((state) => state.jobs.jobs)

  useEffect(() => {
    ;(async () => {
      try {
        if (title) {
          return await dispatch(getJobsByTitle({ limit, offset, title }))
        }

        await dispatch(getJobs({ limit, offset }))
      } catch (error) {}
    })()
  }, [dispatch, limit, offset, title])

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{t('Job')}</title>
      </Helmet>

      <Container maxWidth='lg' className={classes.headingContainer}>
        <Box component='div' paddingBottom={5}>
          <Grid container>
            {/* Filter Form */}
            <FilterFormManagement />
          </Grid>
        </Box>
        <Box component='div' sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {fetchingJob ? (
              <>
                {([1, 2, 3, 4, 5, 6] as const).map((_, index) => (
                  <Grid key={index} item xs={12}>
                    <SkeletonJobCardLarge />
                  </Grid>
                ))}
              </>
            ) : jobs.length === 0 ? (
              <Grid item xs={12}>
                <Card sx={{ display: 'flex' }}>
                  <CardContent style={{ flex: 1 }}>
                    <Typography>No found job</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              <>
                {jobs.map((job, index) => (
                  <Grid item xs={12} key={index}>
                    <JobCardLarge job={job} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Job
