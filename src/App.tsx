import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Policies from './pages/Policies';
import Login from './pages/Login';
import AddPolicy from './pages/AddPolicy';
import AddTransaction from './pages/AddTransaction';
import PolicyDetail from './pages/PolicyDetail';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (data: { token: {access: string}; user: any }) => {
    const accessToken = data.token.access
    setToken(accessToken);
    setUser(data.user);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const router = createBrowserRouter([
    {
      path: '/login',
      element: token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />,
    },
    {
      path: '/dashboard',
      element: token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />,
    },
    {
      path: '/report',
      element: token ? <Report /> : <Navigate to="/login" />,
    },
    {
      path: '/policies',
      element: token ? <Policies /> : <Navigate to="/login" />,
    },
    {
      path: '/add-policy',
      element: token ? <AddPolicy /> : <Navigate to="/login" />,
    },
    {
      path: '/add-transaction/:policyId',
      element: token ? <AddTransaction /> : <Navigate to="/login" />,
    },
    {
      path: '/policy-detail/:policyId',
      element: token ? <PolicyDetail /> : <Navigate to="/login" />,
    },
    {
      path: '/',
      element: <Navigate to="/dashboard" />,
    },
  ]);

  return <RouterProvider router={router} />;
}
