const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'] 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: false,
    match: [/^\+?(\d.*){3,}$/, 'Please use a valid phone number'] 
  },
  role: { 
    type: String, 
    enum: ['customer', 'admin', 'restaurant', 'rider'], 
    default: 'customer' 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  address: { 
    type: {
      formatted_address: { type: String },
      latitude: { type: Number },
      longitude: { type: Number }
    },
    required: false 
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
