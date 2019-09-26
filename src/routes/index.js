var express = require('express');
var router = express.Router();

// home route
const home = require('./home');

// mountain route
const mountain = require('./mountain');

// course route
const course = require('./course');

// home 경로의 요청
router.use('/home', home);

// mountain 경로의 요청
router.use('/mountain', mountain);

// course 경로의 요청
router.use('/course', course);

module.exports = router
