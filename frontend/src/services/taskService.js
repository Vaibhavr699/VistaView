import api from './baseApi';

const taskService = {
  getAllTasks() {
    return api.get('/tasks');
  },
  createTask(taskData) {
    return api.post('/tasks', taskData);
  },
  updateTask(id, taskData) {
    return api.put(`/tasks/${id}`, taskData);
  },
  deleteTask(id) {
    return api.delete(`/tasks/${id}`);
  }
};

export default taskService;