// user-service/src/controllers/authController.js
const authService = require('../services/authService');

// Register a new user (Google or regular)
const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, googleId, addresses } = req.body;

    // Check if user already exists via email or Google ID
    let existingUser = await authService.getUserByEmail(email);
    if (!googleId && existingUser) {
      throw new Error('User already exists');
    }

    // If Google login, create user with googleId, no password needed
    const userData = googleId 
      ? { googleId, name, email, role, addresses }  
      : { name, email, password, phone, role, addresses };  

    const { user, token } = await authService.registerUser(userData);

    res.status(201).json({ message: 'User created successfully', user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update User Profile (Including Address)
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT
    const { name, email, phone, role, addresses } = req.body;  

    // Update profile using the service
    const updatedUser = await authService.updateUserProfile(userId, {
      name,
      email,
      phone,
      role,
      addresses,  // Updating the addresses here
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete User Account
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete user using the service
    await authService.deleteUserAccount(userId);

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({
      message: 'Logged in successfully',
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  updateProfile,
  deleteAccount,
  login,
};
