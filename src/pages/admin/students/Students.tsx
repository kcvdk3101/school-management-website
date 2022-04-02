import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../../../components/commons/Header'

type StudentsProps = {}
const Students: React.FC<StudentsProps> = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <Header title='Students' />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
        </Box>
      </Box>
    </>
  )
}

export default Students
