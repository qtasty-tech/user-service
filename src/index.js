const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Example of a protected route (only accessible by authenticated users)
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have access to this protected route!', user: req.user });
});

// MongoDB connection//
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`User Service running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
