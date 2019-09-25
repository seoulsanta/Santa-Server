const express = require('express');

const router = express.Router();

// homeController
const homeController = require('../controller/homeController');

// home 정보 보기
router.get('/', homeController.getHome);

module.exports = router;