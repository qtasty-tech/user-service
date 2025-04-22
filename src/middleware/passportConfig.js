// user-service/src/middleware/passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Assuming you have a User model
require('dotenv').config();

// Configure Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback", // Update this with your callback URL
},
async (token, tokenSecret, profile, done) => {
  try {
    // Check if user already exists in the database
    let user = await User.findOne({ email: profile.emails[0].value });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
      });

      await user.save();  // Save the new user to the database
    }

    return done(null, user);  // Proceed to the next middleware (passport.serializeUser)
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize the user info into session
passport.serializeUser((user, done) => {
  done(null, user.id);  // Store the user ID in the session
});

// Deserialize the user from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
