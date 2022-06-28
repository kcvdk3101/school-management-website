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
import Blog from './pages/blog/Blog'
import NotFound from './pages/NotFound'

import Teachers from './pages/admin/lecturers/Teachers'
import Notice from './pages/admin/notice/Notice'
import Corporations from './pages/admin/corps/Corporations'

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index={true} element={<Home />} />
          <Route path='job' element={<Job />} />
          <Route path='job/:id' element={<JobDetail />} />

          <Route path='blog' element={<Blog />} />
          <Route path='about' element={<About />} />
        </Route>

        <Route path='/login' element={<Signin />} />

        <Route path='/admin' element={<Admin />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='students' element={<Students />} />
          <Route path='teachers' element={<Teachers />} />
          <Route path='corporation' element={<Corporations />} />
          <Route path='notice' element={<Notice />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
