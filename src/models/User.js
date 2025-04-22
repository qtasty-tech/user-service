// user-service/src/models/User.js
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  isPrimary: { type: Boolean, default: false }  
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin', 'restaurant', 'delivery'], default: 'customer' },
  isVerified: { type: Boolean, default: false },
  addresses: [AddressSchema],  
  googleId: { type: String },  
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
