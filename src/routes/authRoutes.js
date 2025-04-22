// user-service/src/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Update profile route (protected with token validation and Gmail check)
router.put('/profile', authMiddleware, authController.updateProfile);

// Delete account route (protected with token validation and Gmail check)
router.delete('/profile', authMiddleware, authController.deleteAccount);

// Google OAuth login route (initiates the Google OAuth flow)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route (handles the callback from Google after successful login)
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // After successful login, redirect the user
  res.redirect('/dashboard');  // You can change this to any protected route after login
});

module.exports = router;
