const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);
router.get('/me', authenticateToken, userController.getCurrentUser);
router.get('/:id', authenticateToken, userController.getUser);
router.post('/', authenticateToken, authorizeRoles('admin'), userController.createUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;