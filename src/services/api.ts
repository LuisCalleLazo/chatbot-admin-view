import axios from 'axios';
import { getEnv } from '../utils';

const { VITE_HOST_BACKEND } = getEnv();

export const basicApi = axios.create({
  baseURL: `${VITE_HOST_BACKEND}/api/`,
});