import React from 'react'
import { useAppSelector } from '../../app/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../layout/Header';

type AdminProps = {}

const Admin: React.FC<AdminProps> = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log("🚀 ~ file: Admin.tsx ~ line 10 ~ isAuthenticated", isAuthenticated)

  return !isAuthenticated ? <Navigate to="/admin/login" /> : (
    <>
      <Header/>
      <Outlet />
    </>
  );
}

export default Admin