import axios, { AxiosRequestConfig } from 'axios';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URI;

console.log({ BACKEND_URL });
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
