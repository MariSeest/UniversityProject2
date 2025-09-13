import axios from 'axios';

export const API_BASE_URL = (
    (import.meta.env.VITE_API_URL || 'https://berepositoryuniversityprojectjava.onrender.com')
).replace(/\/$/, '');

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
});

export default api;
