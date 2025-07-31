// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // Save result
// router.post('/', async (req, res) => {
//   const { username, wpm, accuracy } = req.body;
//   try {
//     const user = await db.query('SELECT id FROM users WHERE username=$1', [username]);
//     if (user.rows.length === 0) return res.status(404).json({ error: 'User not found' });

//     await db.query(
//       'INSERT INTO results (user_id, wpm, accuracy) VALUES ($1, $2, $3)',
//       [user.rows[0].id, wpm, accuracy]
//     );
//     res.status(201).json({ message: 'Result saved' });
//   } catch (err) {
//     res.status(500).json({ error: 'Could not save result' });
//   }
// });

// // Get results
// router.get('/:username', async (req, res) => {
//   const { username } = req.params;
//   try {
//     const result = await db.query(
//       `SELECT r.wpm, r.accuracy, r.created_at
//        FROM results r
//        JOIN users u ON r.user_id = u.id
//        WHERE u.username = $1
//        ORDER BY r.created_at DESC`,
//       [username]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch results' });
//   }
// });

// // Get average stats
// router.get('/average/:username', async (req, res) => {
//   const { username } = req.params;
//   try {
//     const result = await db.query(
//       `SELECT AVG(wpm)::int as avg_wpm, ROUND(AVG(accuracy), 2) as avg_accuracy
//        FROM results r
//        JOIN users u ON r.user_id = u.id
//        WHERE u.username = $1`,
//       [username]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch average stats' });
//   }
// });

// module.exports = router;
// routes/results.js - Handles storing and fetching scores
const express = require('express');
const router = express.Router();
const db = require('../common/db');

// Save a result
router.post('/', async (req, res) => {
  const { userId, wpm, accuracy } = req.body;

  // We save the typing session details by creating a new row in the results DB
  try {
    await db.query(
      'INSERT INTO results (user_id, wpm, accuracy) VALUES ($1, $2, $3)',
      [userId, wpm, accuracy]
    );

    // res.status(201) is a response from the server stating that a new typing session has been successfully created
    res.status(201).json({ success: true, message: 'Result saved' });
  } catch (error) {
    console.error('Save result error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get all results from a given user
router.get('/history/:userId', async (req, res) => {
  const { userId } = req.params;

  // We query the results db to get the details for a given user_id
  try {
    const result = await db.query(
      `SELECT wpm, accuracy, created_at
       FROM results
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    // In this case we simply return the data
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch user history error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get average wpm and accuracy for a given user
router.get('/average/:username', async (req, res) => {
  const { username } = req.params;

  // Join results + users table to get average based on username
  try {
    const result = await db.query(
      `SELECT
         AVG(r.wpm) AS avg_wpm,
         AVG(r.accuracy) AS avg_accuracy
       FROM results r
       JOIN users u ON r.user_id = u.id
       WHERE u.username = $1`,
      [username]
    );

    // Return avg values (0 if no results exist)
    res.json({
      avg_wpm: result.rows[0].avg_wpm || 0,
      avg_accuracy: result.rows[0].avg_accuracy || 0
    });
  } catch (err) {
    console.error('Average fetch error:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;

