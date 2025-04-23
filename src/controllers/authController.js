const authService = require('../services/authService');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, address } = req.body;
    const { user, token } = await authService.registerUser({
      name,
      email,
      password,
      phone,
      role,
      address,
    });

    res.status(201).json({
      message: 'User created successfully',
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT
    const { name, email, phone, role, address } = req.body;

    // Update profile using the service
    const updatedUser = await authService.updateUserProfile(userId, {
      name,
      email,
      phone,
      role,
      address,
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
    await userRepository.deleteUserAccount(userId);

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