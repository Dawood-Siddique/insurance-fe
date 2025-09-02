import axios from 'axios';
import { authService } from '../services/authService';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = authService.getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/user/login/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          authService.storeTokens({ access_token: access, refresh_token: refreshToken });
          apiClient.defaults.headers.common.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          authService.logout();
          // Redirect to login page
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
