import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

type AdminProps = {}

const Admin: React.FC<AdminProps> = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  return !(isAuthenticated && user.role === 'admin') ? <Navigate to='/login' /> : <Outlet />
}

export default Admin
