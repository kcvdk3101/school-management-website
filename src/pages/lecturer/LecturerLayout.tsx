import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const LecturerLayout: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  return !(isAuthenticated && user.role === 'teacher') ? <Navigate to='/login' /> : <Outlet />
}

export default LecturerLayout
