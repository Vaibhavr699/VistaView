import api from '../services/baseApi';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';

export default {
  namespaced: true,
  state: {
    users: [],
    currentUser: null,
    loading: false
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(u => u.id !== userId);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    async fetchUsers({ commit, dispatch }) {
      commit('SET_LOADING', true);
      try {
        const response = await getAllUsers();
        commit('SET_USERS', response.data);
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch users';
        dispatch('showToast', {
          message: message,
          type: 'error'
        }, { root: true });
        throw message;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchCurrentUser({ commit, dispatch }, userId) {
      try {
        const response = await api.get(`/users/${userId}`);
        commit('SET_CURRENT_USER', response.data);
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch user';
        dispatch('showToast', {
          message: message,
          type: 'error'
        }, { root: true });
        throw message;
      }
    },
    async createUser({ commit, dispatch }, userData) {
      try {
        const response = await createUser(userData);
        commit('ADD_USER', response.data);
        
        dispatch('showToast', {
          message: 'User created successfully!',
          type: 'success'
        }, { root: true });
        
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to create user';
        dispatch('showToast', {
          message: message,
          type: 'error'
        }, { root: true });
        throw message;
      }
    },
    async updateUser({ commit, dispatch }, { id, userData }) {
      try {
        const response = await updateUser(id, userData);
        commit('UPDATE_USER', response.data);
        
        dispatch('showToast', {
          message: 'User updated successfully!',
          type: 'success'
        }, { root: true });
        
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to update user';
        dispatch('showToast', {
          message: message,
          type: 'error'
        }, { root: true });
        throw message;
      }
    },
    async deleteUser({ commit, dispatch }, userId) {
      try {
        await deleteUser(userId);
        commit('DELETE_USER', userId);
        
        dispatch('showToast', {
          message: 'User deleted successfully!',
          type: 'success'
        }, { root: true });
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete user';
        dispatch('showToast', {
          message: message,
          type: 'error'
        }, { root: true });
        throw message;
      }
    }
  },
  getters: {
    allUsers: state => state.users,
    getUserById: state => id => state.users.find(u => u.id === id),
    currentUserDetails: state => state.currentUser,
    isLoading: state => state.loading
  }
};