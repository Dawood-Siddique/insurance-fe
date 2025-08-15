import React from 'react';

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    // In a real app, you'd have authentication logic here
    if (username && password) {
      onLogin();
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Login</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '0.5rem', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.5rem', width: '100%' }}
          />
        </div>
        <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', width: '100%' }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
