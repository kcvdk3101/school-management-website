import { Box, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{t('Job')}</title>
      </Helmet>

      <Container maxWidth='lg' className={classes.headingContainer}>
        <Box component='div' paddingY={10}>
          <Grid container>
            {/* Filter Form */}
            <FilterFormManagement />
          </Grid>
        </Box>
      </Container>
    </div>
  )
}

export default Job
