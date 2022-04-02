import { CssBaseline } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Signin from './pages/admin/signin/Signin'
import Students from './pages/admin/students/Students'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        {/* <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='job' element={<Job />} />
          <Route path='about' element={<About />} />
        </Route> */}

        <Route path='/' element={<Signin />} />

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
