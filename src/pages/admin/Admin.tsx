import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

type AdminProps = {}

const Admin: React.FC<AdminProps> = () => {
  const { i18n } = useTranslation()

  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    let lang = localStorage.getItem('cft-language')
    if (!lang) return
    i18n.changeLanguage(lang)
  }, [i18n])

  return !(isAuthenticated && user.role === 'admin') ? <Navigate to='/login' /> : <Outlet />
}

export default Admin
