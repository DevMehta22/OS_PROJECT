const express = require('express');
const router = express.Router();
const {simulate} = require('../Controllers/ProducerConsumer');

router.post('/simulate',simulate);

module.exports = router;