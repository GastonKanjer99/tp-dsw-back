const express = require('express');
const router = express.Router();

router.use('/races', require('./races'));
router.use('/classes', require('./classes'));
router.use('/backgrounds', require('./backgrounds'));

module.exports = router;