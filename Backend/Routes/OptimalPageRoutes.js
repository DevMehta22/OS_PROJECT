const express = require('express')
const router = express.Router()
const {OptimalPage} = require("../Controllers/OptimalPageControllers")

router.post('/simulate',OptimalPage)

module.exports=router;

