import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar/Navbar'
import Register from './Pages/auth/Register'
import Login from './Pages/auth/Login'
import Reset from './Pages/auth/Reset'
import Forgot from './Pages/auth/Forgot'
import Main from './Pages/Main/Main'


function App() {


  return (
    <>
    <div>
     
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/reset/:resetToken" element={<Reset/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/dashboard" element={<Main/>}/>
    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
