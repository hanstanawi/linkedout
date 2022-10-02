import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

export default axiosInstance;
