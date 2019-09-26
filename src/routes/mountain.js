const express = require('express');

const router = express.Router();

// mountainController
const mountainController = require('../controller/mountainController');

// 모든 산 보기
router.get('/:mountain_idx', mountainController.getMountain);

// 산 이름 검색
router.get('/search', mountainController.getMountainSearch);

module.exports = router;