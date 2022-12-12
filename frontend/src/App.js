import './App.css';
import React from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import TopNavBar from './components/TopNavBar';
import NewPassword from './pages/ForgotPassword/NewPassword';
import Registration from './pages/Registration/Registration';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Trip from './pages/Trip/Trip';
import JoinCreate from './pages/Trip/JoinCreate';
import { Typography } from '@mui/material';
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import Friends from './pages/friends/Friends';
import Profile from './pages/Profile/Profile';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

function App (){

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopNavBar />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="new-password/:hash" element={<NewPassword />} />
            <Route path="trip/:hash" element={<Trip />} />
            <Route path="join-create" element={<JoinCreate />} />
            <Route path="search" element={<Search />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="friends" element={<Friends />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;