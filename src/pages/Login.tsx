import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div className='flex justify-center items-center h-screen'>
      <div className='p-15 border-2 rounded-lg'>
        <h2>Login</h2>
        <div className='mt-3 mb-3'>
          <Input type='email' placeholder='Email' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='mb-3'>
          <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
