const Task = require('../models/taskModel');
const errorHandler = require('../utils/errorHandler');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id; // Assuming user ID is available from authentication middleware
    const newTask = await Task.create({ title, description, userId, status });
    res.status(201).json(newTask);
  } catch (error) {
    errorHandler(res, error, 'Failed to create task');
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res.status(200).json(task);
  } catch (error) {
    errorHandler(res, error, 'Failed to fetch task');
  }
};

exports.getTasksByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    errorHandler(res, error, 'Failed to fetch tasks');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.update(req.params.id, { title, description, status });
    res.status(200).json(updatedTask);
  } catch (error) {
    errorHandler(res, error, 'Failed to update task');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    errorHandler(res, error, 'Failed to delete task');
  }
};