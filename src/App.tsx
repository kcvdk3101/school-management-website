import { CssBaseline } from '@mui/material'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import About from './pages/about/About'
import Admin from './pages/admin/Admin'
import Corporations from './pages/admin/corps/Corporations'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Notice from './pages/admin/notice/Notice'
import Signin from './pages/admin/signin/Signin'
import Students from './pages/admin/students/Students'
import Teachers from './pages/admin/teachers/Teachers'
import Blog from './pages/blog/Blog'
import Home from './pages/home/Home'
import Job from './pages/job/Job'
import JobDetail from './pages/jobDetail/JobDetail'
import Lecturer from './pages/lecturer/Lecturer'
import LecturerLayout from './pages/lecturer/LecturerLayout'
import NotFound from './pages/NotFound'
ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const App: React.FC = () => {
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

        <Route path='/lecturer' element={<LecturerLayout />}>
          <Route index={true} element={<Lecturer />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
