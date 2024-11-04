import axios from "axios";
import { getRefreshToken, setJwtToken, setRefreshToken, getJwtToken } from "../pages/auth/auth";


const baseUrl = "http://localhost:5000/api";

const config = {
  baseUrl,
  timeout: 3000000,
};
const api = axios.create(config);
api.defaults.baseURL = baseUrl;

const refreshToken = async () => {
  const storedRefreshToken = getRefreshToken();
  const storedToken = getJwtToken();
  if (!storedRefreshToken) return null;

  const response = await api.post('/auth/refreshtoken', { Token: storedToken, RefreshToken: storedRefreshToken });
  const { token, refreshToken } = response.data;

  setJwtToken(token);
  setRefreshToken(refreshToken);
  return token;
};

const handleBefore = (config) => {
  const token = getJwtToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const handleError = async (error) => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const newToken = await refreshToken();
    if (newToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return api(originalRequest);
    } else {
      // Redirect to login if refresh token fails
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
};

api.interceptors.request.use(handleBefore, handleError);

export default api;