var express = require('express');
var router = express.Router();

// home route
const home = require('./home');

// home 경로의 요청
router.use('/home', home);

module.exports = router
