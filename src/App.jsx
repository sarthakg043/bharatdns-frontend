import './App.css'
import Signin from './pages/login/Signin'
import Signup from './pages/login/Signup'
import Database from './pages/database/Database'
import Layout from './Layout'
import { ErrorPage } from './pages/ErrorPage'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/bharatdns-frontend/' element={<Layout />}>
        <Route path='' element={<Database />} />
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<ErrorPage />} />
        {/* <Route path='user/:userid' element={<User />} /> */}
      </Route>

  )
)

function App() {


  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
