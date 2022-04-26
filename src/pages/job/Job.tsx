import { Box, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import JobCardLarge from '../../components/card/JobCardLarge'
import SkeletonJobCardLarge from '../../components/skeleton/SkeletonJobCardLarge'
import { getJobs } from '../../features/job/jobSlice'
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

  console.log(limit, offset)

  const fetchingJob = useAppSelector((state) => state.jobs.fetchingJob)
  const jobs = useAppSelector((state) => state.jobs.jobs)

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getJobs({ limit: 5, offset: 0 }))
      } catch (error) {}
    })()
  }, [dispatch])

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
            ) : (
              <>
                {jobs.map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <JobCardLarge job={jobs[0]} />
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
