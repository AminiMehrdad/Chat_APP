import axiosClient from './axiosClient';

export const UserService = {
  createUser: (data) => axiosClient.post('/users', data),

  getUsers: () => axiosClient.get('/users'),

  updateUser: (userId, data) =>
    axiosClient.put(`/users/${userId}`, data),

  deleteUser: (userId) =>
    axiosClient.delete(`/users/${userId}`)
};