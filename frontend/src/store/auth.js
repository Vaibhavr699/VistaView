import api from '../services/baseApi';

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    loading: false,
    initialized: false
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_INITIALIZED(state, initialized) {
      state.initialized = initialized;
    }
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      commit('SET_LOADING', true);
      try {
        const response = await api.post('/auth/login', credentials);
        commit('SET_USER', response.data.user);
        commit('SET_TOKEN', response.data.token);
        localStorage.setItem('token', response.data.token);
        dispatch('toast/showToast', {
          message: `Welcome back${response.data?.user?.name ? ', ' + response.data.user.name : ''}!`,
          type: 'success'
        }, { root: true });
        return response.data.user;
      } catch (error) {
        const message = error.response?.data?.message || 'Login failed';
        dispatch('toast/showToast', { message, type: 'error' }, { root: true });
        throw message;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async register({ commit, dispatch }, userData) {
      commit('SET_LOADING', true);
      try {
        const response = await api.post('/auth/register', userData);
        commit('SET_USER', response.data.user);
        commit('SET_TOKEN', response.data.token);
        localStorage.setItem('token', response.data.token);
        return response.data.user;
      } catch (error) {
        const message = error.response?.data?.message || 'Registration failed';
        dispatch('toast/showToast', { message, type: 'error' }, { root: true });
        throw message;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    logout({ commit, dispatch }, { silent } = {}) {
      commit('CLEAR_AUTH');
      localStorage.removeItem('token');
      if (!silent) {
        dispatch('toast/showToast', { message: 'Logged out successfully', type: 'info' }, { root: true });
      }
    },
    async initializeAuth({ commit, dispatch }) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Set token immediately so API calls include it
          commit('SET_TOKEN', token);
          try {
            // Verify token by fetching user data
            const response = await api.get('/users/me');
            commit('SET_USER', response.data);
          } catch (error) {
            // Token is invalid, clear everything
            commit('CLEAR_AUTH');
            localStorage.removeItem('token');
            dispatch('toast/showToast', { message: 'Session expired. Please sign in again.', type: 'info' }, { root: true });
          }
        } else {
          // No token present
          commit('CLEAR_AUTH');
        }
      } finally {
        commit('SET_INITIALIZED', true);
      }
    },
    async updateProfile({ commit }, userData) {
      commit('SET_LOADING', true);
      try {
        const response = await api.put(`/users/${userData.id}`, userData);
        commit('SET_USER', response.data);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || error.message || 'Profile update failed';
        throw message;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    isAdmin: state => state.user?.role === 'admin',
    isLoading: state => state.loading,
    isInitialized: state => state.initialized
  }
};