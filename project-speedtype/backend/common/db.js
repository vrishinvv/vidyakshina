// common/db.js
const { Pool } = require('pg');
const { db } = require('./configs'); 

const pool = new Pool(db); 

module.exports = pool;
