/* --------------------------------------------------
   01_first_express_server.js  – Hello World in Express
-------------------------------------------------- */

const express = require('express');
const app = express(); // 1️⃣  Create an Express *app*
const PORT = 3000;

// 2️⃣  Define a single *route* – GET /
app.get('/', (req, res) => {
  res.send('👋  Hello World from Express!');
});

// 3️⃣  Start the server
app.listen(PORT, () => {
  console.log(`🌐  Express server listening on http://localhost:${PORT}`);
})