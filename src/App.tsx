import { CssBaseline } from '@mui/material'
import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './pages/about/About'
import Admin from './pages/admin/Admin'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Signin from './pages/admin/signin/Signin'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          <Route path='/login' element={<Signin />} />
          <Route path='/admin' element={<Admin />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </>
      </Routes>
    </>
  )
}

export default App
