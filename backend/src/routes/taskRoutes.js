const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

// Protect all task routes with authentication middleware
router.use(authMiddleware.authenticateToken);

// Create a new task
router.post('/', taskController.createTask);

// Get a single task by ID
router.get('/:id', taskController.getTaskById);

// Get all tasks for the authenticated user
router.get('/', taskController.getTasksByUserId);

// Update a task by ID
router.put('/:id', taskController.updateTask);

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;