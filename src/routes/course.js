const express = require('express');

const router = express.Router();

// courseController
const courseController = require('../controller/courseController');

// 특정 코스 조회
router.get('/:course_idx', courseController.getCourse);

// 특정 코스 루트 조회
router.get('/:course_idx/line', courseController.getCourseLine);

module.exports = router;