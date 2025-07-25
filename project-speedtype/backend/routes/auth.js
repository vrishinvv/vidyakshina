// routes/auth.js - Handles login and registration

const express = require('express');
const router = express.Router();
const pool = require('../db');

// Register a user
router.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if user has entered both a username and a password
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
  
      // Makes an INSERT call to the db to add the user details
      const newUser = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
      );
  
      // res.status(201) is a response from the server stating that a new user has been successfully created
      res.status(201).json({ success: true, message: 'User registered', user: newUser.rows[0] });
    } catch (err) {
      console.error('Registration error:', err.message);
      res.status(500).json({ error: 'Server error during registration' });
    }
  });

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    // We make sure that the credentials entered by the user and the one's in the DB match
    try {
      const user = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
      );
  
      // If the credentials don't match then they are not valid
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // res.status(200) is a response from the server stating that the api call has been successfully executed
      res.status(200).json({ success:true, message: 'Login successful', user: user.rows[0] });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
