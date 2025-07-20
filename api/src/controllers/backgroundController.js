const { Background } = require('../models');
const axios = require("axios");
const logger = require("../utils/logger");
const ApiError = require("../utils/apiError");

const API_BASE = process.env.DND_API_BASE;


exports.getAll = async (req, res, next) => {
  try {
    const backgrounds = await Background.findAll();
    logger.info('Fetched all backgrounds');
    res.status(200).json(backgrounds);
  } catch (err) {
    logger.error('Error fetching backgrounds', err);
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const background = await Background.create(req.body);
    logger.info(`Created background: ${background.name}`);
    res.status(201).json(background);
  } catch (err) {
    logger.error('Error creating background', err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await Background.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Background not found' });

    const updatedBackground = await Background.findByPk(id);
    logger.info(`Updated background with ID: ${id}`);
    res.json(updatedBackground);
  } catch (err) {
    logger.error('Error updating background', err);
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Background.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Background not found' });

    logger.info(`Deleted background with ID: ${id}`);
    res.status(204).send();
  } catch (err) {
    logger.error('Error deleting background', err);
    next(err);
  }
};


// API externa
exports.getbackgroundsFromAPI = async (req, res, next) => {
  try {
    const response = await axios.get(`${API_BASE}/backgrounds`);
    if (!response.data || !Array.isArray(response.data.results)) {
      throw new ApiError("La API externa no devolvió resultados válidos", 502);
    }
    logger.info("GET /api/backgrounds/api - Razas obtenidas desde la API externa");
    res.json(response.data);
  } catch (error) {
    logger.error(`GET /api/backgrounds/api - API error: ${error.message}`);
    next(error);
  }
};
