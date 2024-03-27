const express = require('express');
const router = express.Router();
const {Simulate} = require('../Controllers/SSTF_controllers');

router.post('/simulate',Simulate);

module.exports = router;