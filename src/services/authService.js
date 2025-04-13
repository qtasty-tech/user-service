const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

// Register a new user
const registerUser = async (userData) => {
  // Check if user already exists
  const existingUser = await userRepository.getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create new user
  const user = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { user, token };
};

// Update user profile
const updateUserProfile = async (userId, updatedData) => {
  // Hash password if it's being updated
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  // Update user profile
  const updatedUser = await userRepository.updateUserProfile(userId, updatedData);

  return updatedUser;
};

// Login user
const loginUser = async (email, password) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { user, token };
};

module.exports = {
  registerUser,
  updateUserProfile,
  loginUser,
};
