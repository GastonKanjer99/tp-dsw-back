const { Race } = require('../models');
const axios = require("axios");
const logger = require("../utils/logger");
const ApiError = require("../utils/apiError");

const API_BASE = process.env.DND_API_BASE;


exports.getAll = async (req, res, next) => {
  try {
    const races = await Race.findAll();
    logger.info('Fetched all races');
    res.status(200).json(races);
  } catch (err) {
    logger.error('Error fetching races', err);
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const race = await Race.create(req.body);
    logger.info(`Created race: ${race.name}`);
    res.status(201).json(race);
  } catch (err) {
    logger.error('Error creating race', err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await Race.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Race not found' });

    const updatedRace = await Race.findByPk(id);
    logger.info(`Updated race with ID: ${id}`);
    res.json(updatedRace);
  } catch (err) {
    logger.error('Error updating race', err);
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Race.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Race not found' });

    logger.info(`Deleted race with ID: ${id}`);
    res.status(204).send();
  } catch (err) {
    logger.error('Error deleting race', err);
    next(err);
  }
};

// Base de datos
// const getRacesFromDB = async (req, res, next) => {
//   try {
//     const races = await Race.findAll();
//     logger.info("GET /api/races - Razas obtenidas desde la DB");
//     res.json(races);
//   } catch (error) {
//     logger.error(`GET /api/races - DB error: ${error.message}`);
//     next(error); // delega el error al middleware
//   }
// };

// API externa
exports.getRacesFromAPI = async (req, res, next) => {
  try {
    const response = await axios.get(`${API_BASE}/races`);
    if (!response.data || !Array.isArray(response.data.results)) {
      throw new ApiError("La API externa no devolvió resultados válidos", 502);
    }
    logger.info("GET /api/races/api - Razas obtenidas desde la API externa");
    res.json(response.data);
  } catch (error) {
    logger.error(`GET /api/races/api - API error: ${error.message}`);
    next(error);
  }
};
