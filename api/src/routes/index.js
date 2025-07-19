const express = require('express');
const router = express.Router();

router.use('/races', require('./races')); //Llamo a razas: api/races/api O /api/races. API o DB respectivamente  
router.use('/classes', require('./classes'));
router.use('/backgrounds', require('./backgrounds'));

module.exports = router;