import { useState } from 'react'

import './App.css'
import Signin from './pages/login/Signin'
import Signup from './pages/login/Signup'
import Database  from './pages/database/Database'
import AuthDedails from './components/AuthDedails'
import Layout from './Layout'
import Header from './components/Header/Header'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Footer from './components/Footer/Footer'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Database />} />
      <Route path='signin' element={<Signin />} />
      <Route path='signup' element={<Signup />} />
      {/* <Route path='user/:userid' element={<User />} /> */}
    </Route>
  )
)

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
