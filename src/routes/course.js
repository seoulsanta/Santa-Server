const express = require('express');

const router = express.Router();

// courseController
const courseController = require('../controller/courseController');

// 특정 코스 조회
router.get('/:course_idx', courseController.getCourse);

module.exports = router;