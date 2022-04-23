import { Box, Container, Grid, ImageList, ImageListItem, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation, withTranslation } from 'react-i18next'
import JobCard from '../../components/card/JobCard'
import * as Constants from '../../constants/index'
import SearchFormManagement from './components/searchForm/SearchFormManagement'

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    border: '1px solid red',
  },
  background: {
    maxHeight: 320,
    background: 'linear-gradient(180deg, #f05742 0%, #f05742 50%, #e53935 80%)',
  },
  headingContainer: {
    marginTop: 28,
    marginBottom: 28,
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
})

type HomeProps = {}

function BannerHeading() {
  const { t } = useTranslation()

  return (
    <Grid item xs={12} container>
      <Typography variant='h4' marginBottom={3} color='white' fontWeight='700'>
        {t('Search for internship and work place')}
      </Typography>
    </Grid>
  )
}

const Home: React.FC<HomeProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{t('Home - JOBHUB')}</title>
      </Helmet>

      <Container maxWidth='xl' className={classes.background}>
        <Container maxWidth='lg'>
          <Box component='div' paddingY={10}>
            <Grid container>
              <BannerHeading />
              {/* Search Form */}
              <SearchFormManagement />
            </Grid>
          </Box>
        </Container>
      </Container>

      <Container maxWidth='lg' className={classes.headingContainer}>
        <Box className={classes.heading}>
          <Typography variant='h5' color='#f05742' fontWeight={700}>
            {t('Recruitment News March 2022')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {([1, 2, 3, 4, 5, 6] as const).map((_, index) => (
            <Grid key={index} item xs={6}>
              <JobCard isLoading={true} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth='lg' className={classes.headingContainer}>
        <Box className={classes.heading}>
          <Typography variant='h5' color='#f05742' fontWeight={700}>
            {t('Our partners')}
          </Typography>
        </Box>

        <ImageList variant='quilted' cols={4} rowHeight={150}>
          {Constants.itemData.map((item) => (
            <ImageListItem key={item.img} cols={1} rows={1}>
              <img
                src={`${item.img}?w=${150}&h=${150}&fit=crop&auto=format`}
                alt={item.title}
                loading='lazy'
                style={{ objectFit: 'scale-down' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </div>
  )
}

export default withTranslation()(Home)
