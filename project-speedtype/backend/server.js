const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const resultsRoutes = require('./routes/results');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware comes FIRST
app.use(cors());
app.use(express.json());

//Then mount routes
app.use('/auth', authRoutes);
app.use('/results', resultsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
