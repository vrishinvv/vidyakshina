// server.js
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Simple array to store users (like a basic database)
let users = [];

// Register route - adds user to array
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ message: "User registered" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});