import { useEffect, useState } from 'react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar/Navbar'
import Register from './Pages/auth/Register'
import Login from './Pages/auth/Login'
import Reset from './Pages/auth/Reset'
import Forgot from './Pages/auth/Forgot'
import Main from './Pages/Main/Main'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLoginStatus } from './Services/authService'
import { useDispatch } from 'react-redux'
import { SET_LOGIN } from './redux/features/auth/authSlice'
import AddProduct from './Pages/AddProduct/AddProduct'
import Sidebar from './Components/Sidebar/Sidebar'
import Layout from './Components/Layout/Layout'
import Dashboard from './Pages/Dashboard/Dashboard'

axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch()

const getStatus = async() =>{
    const status = await getLoginStatus();
    dispatch(SET_LOGIN(status));  
}
  
useEffect(()=>{
  getStatus()
},[dispatch])

  return (
    <>
    <div>
     
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/reset/:resetToken" element={<Reset/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/dashboard" element={
       <Sidebar>
        <Layout>
           <Dashboard/>
        </Layout>
       </Sidebar>}/>
      <Route path="/add-product" element={
          <Sidebar>
          <Layout>
            <AddProduct/>
          </Layout>
         </Sidebar>}/>
    </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
