import axios from "axios";
import { getAccessToken, tryRefresh, logout } from "./authStoreBridge";

export const client = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let refreshingPromise: Promise<boolean> | null = null;

client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshingPromise) {
                refreshingPromise = tryRefresh().finally(() => {
                    refreshingPromise = null;
                });
            }

            if (!refreshingPromise) {
                return;
            }

            const success = await refreshingPromise.then(() => true).catch(() => false);

            if (success) {
                const token = getAccessToken();
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return client(originalRequest);
            }

            logout();
        }

        return Promise.reject(error);
    }
);