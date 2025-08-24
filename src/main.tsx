import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Report from './pages/Report.tsx'
import Policies from './pages/Policies.tsx'
import Login from './pages/Login.tsx'
import AddPolicy from './pages/AddPolicy.tsx'
import AddTransaction from './pages/AddTransaction.tsx'

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

const router = createBrowserRouter([
  {path:'/dashboard', element:<Dashboard/>},
  {path:'/report', element:<Report/>},
  {path:'/policies', element:<Policies/>},
  {path:'/', element:<Navigate to="/dashboard" />},
  // {path:'/login', element:<Login/>},
  {path:'/add-policy', element:<AddPolicy/>},
  {path:'/add-transaction/:policyId', element:<AddTransaction/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
