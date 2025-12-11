import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001', 
  withCredentials: true,           
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axiosClient.post('/auth/refresh');
        const newAccess = refreshRes.data.accessToken;

        localStorage.setItem('access_token', newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error('Refresh token failed:', err);
        localStorage.removeItem('access_token');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
