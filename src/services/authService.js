import axiosClient from './axiosClient';

export const AuthService = {
  login: (data) => axiosClient.post('/auth/login', data),

  signup: (data) => axiosClient.post('/auth/signup', data),

  refresh: () => axiosClient.post('/auth/refresh'),

  me: () => axiosClient.get('/auth/profile'),

  updateProfile: (data) => axiosClient.post('/auth/profile', data)
};
