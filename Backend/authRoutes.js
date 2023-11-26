const express = require("express");
const router = express.Router();
const User = require("./schemas/user");

// Sign-up route
router.post("/signup", async (req, res) => {
  try {
    // Create a new user
    const { username, email, password } = req.body;
    console.log(username);
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    // Implement authentication logic and generate tokens here
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(401).send("Invalid credentials");
  }
});

module.exports = router;

