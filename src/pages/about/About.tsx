import { Container, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

type AboutProps = {}

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
})

const About: React.FC<AboutProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{t('About')}</title>
      </Helmet>

      <Container maxWidth='lg'>
        <Box component='div' bgcolor='red' width={200} height={200}></Box>
      </Container>
    </div>
  )
}

export default About
