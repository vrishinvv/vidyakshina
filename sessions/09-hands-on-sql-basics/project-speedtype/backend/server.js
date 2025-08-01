// server.js
const express = require('express');
const pool = require('./common/db'); // import database connection
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Register route - now saves to PostgreSQL database
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Insert user into database table
    const newUser = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
    );
    
    res.json({ message: "User registered", user: newUser.rows[0] });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});