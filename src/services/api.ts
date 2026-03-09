import axios from 'axios';
import { getEnv } from '../utils';

const { VITE_CHATBOT_API, VITE_AUTH_API } = getEnv();

export const authApi = axios.create({
  baseURL: `${VITE_AUTH_API}/`,
});

export const chatbotApi = axios.create({
  baseURL: `${VITE_CHATBOT_API}/`,
});

chatbotApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de respuesta: manejo global de 401
chatbotApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)