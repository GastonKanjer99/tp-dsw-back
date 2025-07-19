const db = require('../models');
const axios = require('axios');

const API_BASE = process.env.DND_API_BASE;

// Base de datos
const getRacesFromDB = async (req, res) => {
  try {
    const races = await db.Race.findAll();
    res.json(races);
  } catch (error) {
    console.error('Error al obtener razas desde la DB:', error.message);
    res.status(500).json({ error: 'Error al obtener razas desde la DB' });
  }
};

// API externa
const getRacesFromAPI = async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/races`);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener razas desde la API:', error.message);
    res.status(500).json({ error: 'Error al obtener razas desde la API' });
  }
};

module.exports = {
  getRacesFromDB,
  getRacesFromAPI
};
