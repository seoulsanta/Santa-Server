const express = require('express');

const router = express.Router();

// mountainController
const mountainController = require('../controller/mountainController');

// 추천 검색어
router.get('/recommend', mountainController.getRecommend);

// 산 이름 검색
router.get('/search', mountainController.getMountainSearch);

// 모든 산 보기
router.get('/:mountain_idx', mountainController.getMountain);

module.exports = router;