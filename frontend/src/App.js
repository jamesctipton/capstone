import './App.css';
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import axios from 'axios';
import Registration from './pages/Registration';
import TopNavBar from './pages/TopNavBar';

function App() {

  const [getMessage, setGetMessage] = useState({})

  //allows the app to use the flask api
  useEffect(()=>{
    axios.get('http://localhost:5000/').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])

  useEffect(() => {
    fetch("/")
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopNavBar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;