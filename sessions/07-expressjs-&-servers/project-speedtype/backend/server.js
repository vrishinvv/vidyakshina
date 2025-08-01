// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON from requests
app.use(express.json());

// GET route - responds to browser requests
app.get('/', (req, res) => {
    res.json({ message: "Server running" });
});

// POST route - accepts data from client
app.post('/test', (req, res) => {
    const { name } = req.body;
    res.json({ message: "Hello " + name });
});

// Start server on port 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});