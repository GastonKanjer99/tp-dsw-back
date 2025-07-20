const db = require("../models");
const axios = require("axios");
const logger = require("../utils/logger");
const ApiError = require("../utils/apiError");

const API_BASE = process.env.DND_API_BASE;

// Base de datos
const getRacesFromDB = async (req, res, next) => {
  try {
    const races = await db.Race.findAll();
    logger.info("GET /api/races - Razas obtenidas desde la DB");
    res.json(races);
  } catch (error) {
    logger.error(`GET /api/races - DB error: ${error.message}`);
    next(error); // delega el error al middleware
  }
};

// API externa
const getRacesFromAPI = async (req, res, next) => {
  try {
    const response = await axios.get(`${API_BASE}/races`);

    if (!response.data || !Array.isArray(response.data.results)) {
      throw new ApiError("La API externa no devolvió resultados validos", 502);
    }
    logger.info("GET /api/races/api - Razas obtenidas desde la API externa");
    res.json(response.data);
  } catch (error) {
    logger.error(`GET /api/races/api - API error: ${error.message}`);
    next(error); // delega el error al middleware
  }
};

module.exports = {
  getRacesFromDB,
  getRacesFromAPI,
};
