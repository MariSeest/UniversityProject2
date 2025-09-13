import axios from 'axios';

const base =
    (import.meta.env?.VITE_API_URL || '').replace(/\/$/, '') ||
    'https://berepositoryuniversityprojectjava.onrender.com';

const api = axios.create({
    baseURL: base,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

export default api;
