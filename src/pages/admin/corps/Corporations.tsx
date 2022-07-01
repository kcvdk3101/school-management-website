import { Box, Grid, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import queryString from 'query-string'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import { getCorporations } from '../../../features/corporation/corporationSlice'
import CorporationCard from './components/CorporationCard'

type CorporationsProps = {}

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
    alignItems: 'flex-start',
  },
})

const Corporations: React.FC<CorporationsProps> = () => {
  const classes = useStyles()
  let { search } = useLocation()
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const { corporations, fetchCorporations } = useAppSelector((state) => state.corps)

  let paginationQuery = queryString.parse(search)
  const limit = paginationQuery.limit ? +paginationQuery.limit : 0
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getCorporations({ limit, offset }))
      } catch (error) {
        toast.error('Cannot load data')
      }
    })()
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>{t('Corporation')}</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Header title='Corporation' />

        <Box component='main' className={classes.container}>
          <Toolbar />
          <Box style={{ marginTop: 16 }}>
            {fetchCorporations ? (
              <Typography>Loading</Typography>
            ) : (
              <Grid container spacing={3}>
                {corporations && corporations.length > 0 ? (
                  <>
                    {corporations.map((corp, index) => (
                      <Grid item xs={3} key={index}>
                        <CorporationCard corporation={corp} />
                      </Grid>
                    ))}
                  </>
                ) : (
                  <Grid item>
                    <Typography>Không có dữ liệu</Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Corporations
