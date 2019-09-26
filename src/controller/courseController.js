const courseService = require('../service/courseService');
const { response, errorResponse } = require('../library/response');

async function getCourse(req, res) {
    try {
        const result = await courseService.getCourse(req.params.course_idx); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

async function getCourseLine(req, res) {
    try {
        const result = await courseService.getCourseLine(req.params.course_idx); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

module.exports = {
    getCourse,
    getCourseLine,
};
