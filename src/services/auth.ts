import { Credentials } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const login = async (credentials: Credentials) => {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  return data;
};
