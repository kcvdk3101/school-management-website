import BackpackIcon from '@mui/icons-material/Backpack'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import SchoolIcon from '@mui/icons-material/School'
import { Container, Grid, LinearProgress } from '@mui/material'
import Box from '@mui/material/Box'
import { blue, red, yellow } from '@mui/material/colors'
import Toolbar from '@mui/material/Toolbar'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import { reportCorporation } from '../../../features/corporation/corporationSlice'
import { reportStudent } from '../../../features/student/studentsSlice'
import CountTotal from './components/CountTotal'
import PieChart from './components/PieChart'
import TeacherRank from './components/TeacherRank'
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
  const { report, fetchingReport } = useAppSelector((state) => state.students)
  const { reportCorp, fetchCorporationReport } = useAppSelector((state) => state.corps)

  const [statusStudentReport, setStatusStudentReport] = useState<any>({})
  const [studentHaveInstructorReport, setStudentHaveInstructorReport] = useState<any>({})

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(reportCorporation(year))
        const responseStudent: any = await dispatch(reportStudent(year))
        if (responseStudent.meta.requestStatus === 'fulfilled') {
          let dataStatus = {
            labels: [t("Haven't practiced"), t('Practicing'), t('Trained')],
            datasets: [
              {
                label: '# of Votes',
                data: [242, 14, 11],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }
          let dataHaveInstructor = {
            labels: [t('No lecturer'), t('Have lecturer')],
            datasets: [
              {
                label: '# of Votes',
                data: [
                  responseStudent.payload.report.numberOfStudentHaveNotInstructor as number,
                  responseStudent.payload.report.numberOfStudentHaveInstructor as number,
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
              },
            ],
          }

          setStatusStudentReport(dataStatus)
          setStudentHaveInstructorReport(dataHaveInstructor)
        }
      } catch (error) {
        toast.error('Cannot load data report')
      }
    })()
  }, [dispatch, year])

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
            {fetchingReport && fetchCorporationReport ? (
              <LinearProgress color='secondary' />
            ) : (
              <Grid container spacing={3}>
                <Grid item container xs={12} spacing={3}>
                  <Grid item xs={12} md={4}>
                    <CountTotal
                      bgColor={blue[600]}
                      title={t('Total number of students')}
                      total={report.totalOfStudentsInAcademicYear as number}
                      icon={<BackpackIcon fontSize='large' style={{ color: 'white' }} />}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CountTotal
                      bgColor={red[600]}
                      title={t('Total number of teachers')}
                      total={report.totalOfTeachersInAcademicYear as number}
                      icon={<SchoolIcon fontSize='large' style={{ color: 'white' }} />}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CountTotal
                      bgColor={yellow[600]}
                      title={t('Total number of corporations')}
                      total={reportCorp.numberOfAllCorporation as number}
                      icon={<CorporateFareIcon fontSize='large' style={{ color: 'white' }} />}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3}>
                  <Grid item xs={4}>
                    <PieChart
                      title={t('Status Student Report')}
                      fetching={fetchingReport}
                      statusStudentReport={statusStudentReport}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <VerticalBarChart />
                  </Grid>
                  <Grid item xs={4}>
                    <TeacherRank />
                  </Grid>
                  <Grid item xs={4}>
                    <PieChart
                      title={t('Student')}
                      fetching={fetchingReport}
                      statusStudentReport={studentHaveInstructorReport}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <PieChart
                      title={t('Student')}
                      fetching={fetchingReport}
                      statusStudentReport={statusStudentReport}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
