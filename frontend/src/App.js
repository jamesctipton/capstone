import './App.css';
<<<<<<< HEAD
import React, { Component, useState } from 'react';
=======
import React from 'react';
>>>>>>> 476b51acf1e75ee7e5d6f15b3d275b5a7c88afb6
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopNavBar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="new-password/:hash" element={<NewPassword />} />
          <Route path="trip/:hash" element={<Trip />} />
<<<<<<< HEAD
          <Route path="join-create" element={<JoinCreate isLoggedIn={loggedIn} />} />
          <Route path="search" element={<Search isLoggedIn={loggedIn}/>} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="friends" element={<Friends />} />
=======
          <Route path="join-create" element={<JoinCreate />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Typography>Favorites</Typography>} />
          <Route path="friends" element={<Typography>Friends</Typography>} />
>>>>>>> 476b51acf1e75ee7e5d6f15b3d275b5a7c88afb6
          <Route path="profile" element={<Typography>Profile</Typography>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;