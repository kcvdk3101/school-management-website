import { Container, Grid, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import LecturerInfo from './info/LecturerInfo'
import LecturerStudent from './students/LecturerListStudent'

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

  return (
    <>
      <Helmet>
        <title>Lecturer</title>
      </Helmet>
      <Container maxWidth='md'>
        <Paper className={classes.container}>
          <Grid container spacing={3}>
            <LecturerInfo />
            <LecturerStudent />
          </Grid>
        </Paper>
      </Container>
    </>
  )
}

export default Lecturer
