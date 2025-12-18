// import axios from "axios";
// import { getAccessToken, tryRefresh, logout } from "./authStoreBridge";

// export const client = axios.create({
//     baseURL: 'http://localhost:3001',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// client.interceptors.request.use((config) => {
//     const token = getAccessToken();   
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// let refreshingPromise: Promise<boolean> | null = null;

// client.interceptors.response.use(
//   res => res,   
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry 
//     ) {
//       originalRequest._retry = true;

//       if (!refreshingPromise) {
//         refreshingPromise = tryRefresh().finally(() => {
//           refreshingPromise = null;
//         });
//       }

//       const success = await refreshingPromise;

//       if (success) {
//         const token = getAccessToken();

//         if (token) {
//           originalRequest.headers.Authorization =
//             `Bearer ${token}`;
//         }

//         return client(originalRequest);
//       }

//       logout();
//     }

//     return Promise.reject(error);
//   }
// );

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  tryRefresh,
  logout,
} from "./authStoreBridge";

/* =========================================
   Main API Client (protected endpoints)
========================================= */

export const client = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================
   Request Interceptor
========================================= */

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

/* =========================================
   Refresh Control (Single Flight Lock)
========================================= */

let refreshingPromise: Promise<boolean> | null = null;

/**
 * اگر یک بار refresh شکست قطعی بخورد
 * دیگر در این session تلاش مجدد نمی‌کنیم
 */
let refreshPermanentlyFailed = false;

/* =========================================
   Response Interceptor
========================================= */

client.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    /* -------------------------------
       Guard 0: اگر refresh قبلاً شکست خورده
    -------------------------------- */
    if (refreshPermanentlyFailed) {
      logout();
      return Promise.reject(error);
    }

    /* -------------------------------
       Guard 1: فقط روی 401
    -------------------------------- */
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    /* -------------------------------
       Guard 2: جلوگیری از loop retry
    -------------------------------- */
    if (originalRequest._retry) {
      logout();
      return Promise.reject(error);
    }

    /* -------------------------------
       Guard 3: هرگز روی refresh endpoint
    -------------------------------- */
    if (originalRequest.url?.includes("/auth/refresh")) {
      refreshPermanentlyFailed = true;
      logout();
      return Promise.reject(error);
    }

    /* -------------------------------
       Retry Started
    -------------------------------- */
    originalRequest._retry = true;

    /* -------------------------------
       Single Flight Refresh
    -------------------------------- */
    if (!refreshingPromise) {
      refreshingPromise = tryRefresh()
        .catch(() => false)
        .finally(() => {
          refreshingPromise = null;
        });
    }

    const refreshSuccess = await refreshingPromise;

    if (!refreshSuccess) {
      refreshPermanentlyFailed = true;
      logout();
      return Promise.reject(error);
    }

    /* -------------------------------
       Retry Original Request
    -------------------------------- */
    const newAccessToken = getAccessToken();

    if (newAccessToken) {
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;
    }

    return client(originalRequest);
  }
);
