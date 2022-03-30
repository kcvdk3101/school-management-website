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
  // flex: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignContent: 'flex-start',
  //   border: '1px solid red',
  // },
  // background: {
  //   maxHeight: 320,
  //   background: 'linear-gradient(180deg, #f05742 0%, #f05742 50%, #e53935 80%)',
  // },
  // headingContainer: {
  //   marginTop: 28,
  //   marginBottom: 28,
  // },
  // heading: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   marginBottom: 16,
  //   fontWeight: 'bold',
  // },
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
