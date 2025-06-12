const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_BASE = process.env.DND_API_BASE;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/classes`);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener clases:', error.message);
    res.status(500).json({ error: 'Error al obtener clases' });
  }
});

module.exports = router;