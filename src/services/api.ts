import axios from 'axios';
import { getEnv } from '../utils';

const { VITE_CHATBOT_API, VITE_AUTH_API } = getEnv();

export const authApi = axios.create({
  baseURL: `${VITE_AUTH_API}/`,
});

export const chatbotApi = axios.create({
  baseURL: `${VITE_CHATBOT_API}/`,
});