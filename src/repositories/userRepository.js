const User = require('../models/User');

// Get user by email
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Create a new user
const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// Update user profile
const updateUserProfile = async (userId, updatedData) => {
  return await User.findByIdAndUpdate(userId, updatedData, { new: true });
};

// Delete user account
const deleteUserAccount = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  getUserByEmail,
  createUser,
  updateUserProfile,
  deleteUserAccount,
};