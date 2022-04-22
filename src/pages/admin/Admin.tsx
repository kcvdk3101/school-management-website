import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

type AdminProps = {}

const Admin: React.FC<AdminProps> = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return !isAuthenticated ? <Navigate to='/login' /> : <Outlet />
}

export default Admin
