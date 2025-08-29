import api from './baseApi';

export default {
  // Auth
  login(credentials) {
    return api.post('/auth/login', credentials);
  },
  register(userData) {
    return api.post('/auth/register', userData);
  },

  // Users
  getUsers() {
    return api.get('/users');
  },
  getUser(id) {
    return api.get(`/users/${id}`);
  },
  createUser(userData) {
    return api.post('/users', userData);
  },
  updateUser(id, userData) {
    return api.put(`/users/${id}`, userData);
  },
  deleteUser(id) {
    return api.delete(`/users/${id}`);
  }
};