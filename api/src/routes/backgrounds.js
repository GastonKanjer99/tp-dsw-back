const express = require('express');
const router = require('express').Router();
const backgroundController = require('../controllers/backgroundController');

const API_BASE = process.env.DND_API_BASE;

router.get('/', backgroundController.getAll);
router.post('/', backgroundController.create);
router.put('/:id', backgroundController.update);
router.delete('/:id', backgroundController.remove);
router.get('/api', backgroundController.getbackgroundsFromAPI); // API externa

module.exports = router;
