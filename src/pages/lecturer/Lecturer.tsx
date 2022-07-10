import { Container, Grid, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import { StudentModel } from '../../models/student.model'
import LecturerInfo from './info/LecturerInfo'
import LecturerListStudent from './students/LecturerListStudent'

type LecturerProps = {}

const useStyles = makeStyles({
  container: {
    margin: 16,
    padding: 16,
    minWidth: '100vh',
  },
})

const Lecturer: React.FC<LecturerProps> = () => {
  const classes = useStyles()
  const { i18n } = useTranslation()

  const { detail } = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    let lang = localStorage.getItem('cft-language')
    if (!lang) return
    i18n.changeLanguage(lang)
  }, [i18n])

  return (
    <>
      <Helmet>
        <title>Lecturer</title>
      </Helmet>
      <Container maxWidth='md'>
        <Paper className={classes.container}>
          <Grid container spacing={3}>
            <LecturerInfo />
            <LecturerListStudent
              listStudentAccepted={detail?.student as StudentModel[]}
              listStudentWaitingAccepted={detail?.studentWaitingAccepted as StudentModel[]}
            />
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default Lecturer
