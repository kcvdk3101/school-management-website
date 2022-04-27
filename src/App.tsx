import { CssBaseline } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import About from './pages/about/About'
import Admin from './pages/admin/Admin'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Signin from './pages/admin/signin/Signin'
import Students from './pages/admin/students/Students'
import Home from './pages/home/Home'
import Job from './pages/job/Job'
import JobDetail from './pages/jobDetail/JobDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path='job' element={<Job />} />
          <Route path='job/:id' element={<JobDetail />} />

          <Route path='about' element={<About />} />
        </Route>

        <Route path='/login' element={<Signin />} />

        <Route path='/admin' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='students' element={<Students />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
