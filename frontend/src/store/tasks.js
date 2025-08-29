import api from '../services/baseApi';

export default {
  namespaced: true,
  state: {
    tasks: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchTasks({ commit, dispatch }) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      try {
        const response = await api.get('/tasks');
        commit('SET_TASKS', response.data);
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch tasks';
        commit('SET_ERROR', message);
        dispatch('toast/showToast', { message, type: 'error' }, { root: true });
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createTask({ commit, dispatch }, taskData) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      try {
        const response = await api.post('/tasks', taskData);
        commit('ADD_TASK', response.data);
        dispatch('toast/showToast', { message: 'Task created successfully!', type: 'success' }, { root: true });
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to create task';
        commit('SET_ERROR', message);
        dispatch('toast/showToast', { message, type: 'error' }, { root: true });
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async updateTask({ commit, dispatch }, { id, taskData }) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      try {
        const response = await api.put(`/tasks/${id}`, taskData);
        commit('UPDATE_TASK', response.data);
        dispatch('toast/showToast', { message: 'Task updated successfully!', type: 'success' }, { root: true });
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to update task';
        commit('SET_ERROR', message);
        dispatch('toast/showToast', { message, type: 'error' }, { root: true });
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async deleteTask({ commit, dispatch }, taskId) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      try {
        await api.delete(`/tasks/${taskId}`);
        commit('DELETE_TASK', taskId);
        dispatch('toast/showToast', { message: 'Task deleted successfully!', type: 'success' }, { root: true });
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete task';
        commit('SET_ERROR', message);
        dispatch('toast/showToast', { message, type: 'error' }, { root: true });
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    allTasks: state => state.tasks,
    getTaskById: state => id => state.tasks.find(task => task.id === id),
    isLoading: state => state.loading,
    taskError: state => state.error
  }
};