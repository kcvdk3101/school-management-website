import { CssBaseline } from '@mui/material';
import React, { Fragment } from 'react';
import {
  Route, Routes
} from "react-router-dom";
import Admin from './pages/admin/Admin';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Signin from './pages/admin/Signin/Signin';
import Home from './pages/home/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Fragment>
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          </Route>

          <Route path='/login' element={<Signin/>} />
          <Route path='/admin' element={<Admin/>}>
            <Route path='dashboard' element={<Dashboard/>} />
          </Route>
          <Route path='*' element={<NotFound/>} />
        </Fragment>
      </Routes>
    </>
  );
}

export default App;
