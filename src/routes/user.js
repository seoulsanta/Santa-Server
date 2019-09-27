const express = require('express');

const router = express.Router();

// userController
const userController = require('../controller/userController');

// 마이페이지 조회
router.get('/mypage', userController.getMypage);

// 마이페이지 수정
// router.put('/mypage', userController.putMypage);

// 뱃지 조회
router.get('/badge', userController.getBadge);

// 뱃지 등록
// router.post('/badge', userController.postBadge);

module.exports = router;