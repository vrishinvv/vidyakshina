// common/db.js
const { Pool } = require('pg');
const { db } = require('./configs');

// Create connection pool to database
const pool = new Pool(db);

module.exports = pool;