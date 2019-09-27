const express = require('express');

const router = express.Router();

// loginController
const loginController = require('../controller/loginController');

// 카카오 로그인
router.post('/kakao', loginController.postKakao);

// 네이버 로그인
router.post('/naver', loginController.postNaver);

module.exports = router;