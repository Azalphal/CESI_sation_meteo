const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const ensureAuthenticated = require('../middleware/auth');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Meteo_API',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all sonde data
router.get('/sonde', ensureAuthenticated, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sonde');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new releve
router.post('/releves', ensureAuthenticated, async (req, res) => {
  const { humidite, temperature, position } = req.body;

  if (!humidite || !temperature || !position) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    await pool.query('INSERT INTO releves (humidite, temperature, position) VALUES (?, ?, ?)', [humidite, temperature, position]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes for update and delete operations

module.exports = router;
