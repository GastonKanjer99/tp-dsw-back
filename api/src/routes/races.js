const express = require('express');
const router = express.Router();
const raceController = require('../controllers/raceController');

const API_BASE = process.env.DND_API_BASE;

router.get('/', raceController.getRacesFromDB); //  Base de datos
router.get('/api', raceController.getRacesFromAPI); // API externa

module.exports = router;
