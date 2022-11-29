import './App.css';
import React, { Component, useState } from 'react';
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
// import Sidebar  from './components/Sidebar';

function App (){

  const [loggedIn, setLogin] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopNavBar isLoggedIn={loggedIn} setLogin={setLogin} />}>
          <Route index element={<Home isLoggedIn={loggedIn} />} />
          <Route path="login" element={<Login setLogin={setLogin} />} />
          <Route path="register" element={<Registration />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="new-password/:hash" element={<NewPassword />} />
          <Route path="trip/:hash" element={<Trip />} />
          <Route path="join-create" element={<JoinCreate isLoggedIn={loggedIn} />} />
          <Route path="search" element={<Search isLoggedIn={loggedIn}/>} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="friends" element={<Friends />} />
          <Route path="profile" element={<Typography>Profile</Typography>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;