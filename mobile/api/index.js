import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://172.20.10.6:8000/' });
