// user-service/src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Update profile route (protected)
router.put('/profile', authMiddleware, authController.updateProfile);

// Delete account route (protected)
router.delete('/profile', authMiddleware, authController.deleteAccount);

module.exports = router;