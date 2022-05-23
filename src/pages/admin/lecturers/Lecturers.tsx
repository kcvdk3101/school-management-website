import { Box, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Header from '../../../components/commons/Header'

type LecturersProps = {}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
})

const Lecturers: React.FC<LecturersProps> = () => {
  const classes = useStyles()

  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Lecturer')}</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Header title='Lecturer' />
        <Box component='main' className={classes.container}>
          <Toolbar />
          <Box component='div' className={classes.innerContainer}>
            <Typography>Lecturer</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Lecturers
