import * as React from 'react';
import {CssBaseline} from '@mui/material';
import {
  Routes,
  Route,
} from "react-router-dom";
import NotFound from './pages/NotFound';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
