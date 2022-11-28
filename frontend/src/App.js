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


function App() {

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
          <Route path="join-create" element={<JoinCreate />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Typography>Favorites</Typography>} />
          <Route path="friends" element={<Typography>Friends</Typography>} />
          <Route path="profile" element={<Typography>Profile</Typography>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;