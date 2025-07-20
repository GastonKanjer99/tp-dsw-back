const express = require('express');
const router = require('express').Router();
const raceController = require('../controllers/raceController');

const API_BASE = process.env.DND_API_BASE;

router.get('/', raceController.getAll);
router.post('/', raceController.create);
router.put('/:id', raceController.update);
router.delete('/:id', raceController.remove);
router.get('/api', raceController.getRacesFromAPI); // API externa

module.exports = router;
