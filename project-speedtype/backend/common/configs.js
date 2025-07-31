// config/dbConfig.js
require('dotenv').config();

module.exports = {
  db: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // for NeonDB
    }
  }
};
