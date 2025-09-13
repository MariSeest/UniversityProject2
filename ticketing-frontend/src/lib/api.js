// src/lib/api.js
import axios from 'axios';

// Base URL dal .env (VITE_API_URL), altrimenti il backend su Render
const base =
    (import.meta.env?.VITE_API_URL || '').replace(/\/$/, '') ||
    'https://berepositoryuniversityprojectjava.onrender.com';

// istanza axios condivisa
const api = axios.create({
    baseURL: base,
    timeout: 60000,                // <-- 60s: lascia il tempo al cold start
    headers: { 'Content-Type': 'application/json' },
});

// Retry con backoff su errori transienti/cold start
api.interceptors.response.use(
    r => r,
    async (error) => {
        const cfg = error.config;
        // non ritentare per richieste senza config o se già oltre il limite
        if (!cfg || cfg.__retryCount >= 2) {
            return Promise.reject(error);
        }
        // Retriamo su timeout, 502/503/504 e ERR_NETWORK
        const status = error?.response?.status;
        const isTimeout = error.code === 'ECONNABORTED';
        const isTransient = isTimeout || [502,503,504].includes(status) || error.message?.includes('Network');

        if (!isTransient) return Promise.reject(error);

        cfg.__retryCount = (cfg.__retryCount || 0) + 1;
        const delayMs = 1000 * Math.pow(2, cfg.__retryCount); // 2s, 4s …
        await new Promise(res => setTimeout(res, delayMs));
        return api(cfg);
    }
);

export default api;
