const express = require('express');
const router = express.Router();
const {AddProcess,RunSimulation} = require('../Controllers/controllers');

router.post('/add-process',AddProcess);
router.post('/run-simulation',RunSimulation);

module.exports = router;