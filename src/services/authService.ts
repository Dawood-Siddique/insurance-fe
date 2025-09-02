import axios from 'axios';
import { AuthResponse, LoginCredentials } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${BASE_URL}/auth/user/login/`,
    credentials
  );
  return response.data;
};

const storeTokens = (tokens: AuthResponse) => {
  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
};

const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

const isLoggedIn = (): boolean => {
  const accessToken = getAccessToken();
  return !!accessToken;
};

export const authService = {
  login,
  storeTokens,
  getAccessToken,
  getRefreshToken,
  logout,
  isLoggedIn,
};
