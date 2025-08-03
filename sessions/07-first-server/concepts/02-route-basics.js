/* --------------------------------------------------
   02_routes_basic.js  – Multiple routes & params
-------------------------------------------------- */

const express = require('express');
const app = express();
const PORT = 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome! Try /hello/yourname or /search?term=node');
});

// Route *parameter* → /hello/Alice
app.get('/hello/:name', (req, res) => {
  const { name } = req.params; // ← "Alice"
  res.send(`👋  Hello, ${name}!`);
});

// Query parameter → /search?term=node
app.get(' /search', (req, res) => {
  const { term } = req.query; // ← "node"
  res.json({ message: `You searched for: ${term}` });
});

app.listen(PORT, () => {
  console.log(`🌐  Express examples at http://localhost:${PORT}`);
});