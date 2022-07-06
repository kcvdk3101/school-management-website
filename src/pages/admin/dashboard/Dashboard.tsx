import { Container, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import { reportStudent } from '../../../features/student/studentsSlice'
import CountTotal from './components/CountTotal'
import PieChart from './components/PieChart'
import VerticalBarChart from './components/VerticalBarChart'

type DashboardProps = {}

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  totalCount: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
  },
})

const Dashboard: React.FC<DashboardProps> = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const d = new Date()
  let year = d.getFullYear()

  const dispatch = useAppDispatch()
  const { report } = useAppSelector((state) => state.students)

  const [studentStatus, setStudentStatus] = useState<number[]>([])
  useEffect(() => {
    ;(async () => {
      try {
        const response = await dispatch(reportStudent(year))
        if (response.meta.requestStatus === 'fulfilled') {
          setStudentStatus([
            report.numberOfNotInternship as number,
            report.numberOfInternship as number,
            report.numberOfCompletedInternship as number,
          ])
        }
      } catch (error) {
        toast.error('Cannot load data report')
      }
    })()
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <Header title='Dashboard' />
        <Box component='main' className={classes.container}>
          <Toolbar />
          <Container maxWidth='xl' sx={{ my: 4 }}>
            <Grid container spacing={3}>
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={12} md={4}>
                  <CountTotal title={t('Total number of students')} total={269} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CountTotal title={t('Total number of teachers')} total={0} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CountTotal title={t('Total number of corporations')} total={0} />
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={3}>
                  <Typography>List Student mai lafm</Typography>
                </Grid>
                <Grid item xs={6}>
                  <VerticalBarChart />
                </Grid>
                <Grid item xs={3}>
                  <PieChart report={studentStatus} />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
