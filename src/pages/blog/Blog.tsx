import { Container, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

type BlogProps = {}

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
})

const Blog: React.FC<BlogProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.container}>
      <Helmet>
        <title>{t('About')}</title>
      </Helmet>

      <Container maxWidth='lg'>
        <Box component='div' bgcolor='blue' width={200} height={200}></Box>
      </Container>
    </div>
  )
}

export default Blog
