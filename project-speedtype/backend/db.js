const { Pool } = require('pg');
require('dotenv').config();
// have a common folder for configs where you import all the configs and use them
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // for NeonDB
  }
});

module.exports = pool;
