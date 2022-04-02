import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../../../components/commons/Header'

type DashboardProps = {}
const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <Header title='Dashboard' />
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
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

export default Dashboard
