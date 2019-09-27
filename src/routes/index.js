var express = require('express');
var router = express.Router();

// login route
const login = require('./login');

// home route
const home = require('./home');

// mountain route
const mountain = require('./mountain');

// course route
const course = require('./course');

// login 경로의 요청
router.use('/login', login);

// home 경로의 요청
router.use('/home', home);

// mountain 경로의 요청
router.use('/mountain', mountain);

// course 경로의 요청
router.use('/course', course);

module.exports = router
