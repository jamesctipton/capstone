import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from './pages/Layout';

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/")
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;