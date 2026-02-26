import axios from 'axios';
import { getEnv } from '../utils';

const { VITE_HOST_BACKEND, VITE_AUTH_API } = getEnv();

export const authApi = axios.create({
  baseURL: `${VITE_AUTH_API}/api/`,
});

export const basicApi = axios.create({
  baseURL: `${VITE_HOST_BACKEND}/api/`,
});