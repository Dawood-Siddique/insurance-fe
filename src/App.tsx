import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Policies from './pages/Policies';
import Login from './pages/Login';
import AddPolicy from './pages/AddPolicy';
import AddTransaction from './pages/AddTransaction';
import PolicyDetail from './pages/PolicyDetail';

const ProtectedRoute = ({ token, children }: { token: string | null, children: JSX.Element }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  const handleLogin = (data: { token: { access: string }; user: any }) => {
    console.log('handleLogin received data:', data);
    const accessToken = data.token.access;
    console.log('Extracted access token:', accessToken);
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        
        <Route path="/dashboard" element={<ProtectedRoute token={token}><Dashboard onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute token={token}><Report /></ProtectedRoute>} />
        <Route path="/policies" element={<ProtectedRoute token={token}><Policies /></ProtectedRoute>} />
        <Route path="/add-policy" element={<ProtectedRoute token={token}><AddPolicy /></ProtectedRoute>} />
        <Route path="/add-transaction/:policyId" element={<ProtectedRoute token={token}><AddTransaction /></ProtectedRoute>} />
        <Route path="/policy-detail/:policyId" element={<ProtectedRoute token={token}><PolicyDetail /></ProtectedRoute>} />
        
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
