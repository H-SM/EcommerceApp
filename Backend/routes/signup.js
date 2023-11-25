const express = require('express');
const router = express.Router();
const User = require('../schemas/user'); // Import the User schema

// Define the sign-up route
router.post('/signup', async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Create a new user using the User schema
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message or any relevant data
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle errors, for example, if the username or email is already taken
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

module.exports = router;