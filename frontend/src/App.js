import './App.css';
import React, { useState } from 'react';
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


function App() {

  const [loggedIn, setLogin] = useState(false)
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopNavBar isLoggedIn={loggedIn} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login setLogin={setLogin}/>} />
          <Route path="register" element={<Registration />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="new-password/:hash" element={<NewPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;