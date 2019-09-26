const express = require('express');

const router = express.Router();

// mountainController
const mountainController = require('../controller/mountainController');

// 모든 산 보기
router.get('/', mountainController.getMountain);

module.exports = router;