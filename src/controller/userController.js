const userService = require('../service/userService');
const { response, errorResponse } = require('../library/response');
const { getUserIdxFromJwt } = require('../library/jwtCheck');

async function getMypage(req, res) {
    try {
        const result = await userService.getMypage(getUserIdxFromJwt(req.headers.authorization)); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

async function putMypage(req, res) {
    try {
        const { file } = req;
        const { name } = req.body;
        
        let result;
        
        if (file==undefined) {
            result = await userService.putMypage(getUserIdxFromJwt(req.headers.authorization), name, null); 
        } else {
            result = await userService.putMypage(getUserIdxFromJwt(req.headers.authorization), name, file.location); 
        }
        
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

async function getBadge(req, res) {
    try {
        const result = await userService.getBadge(getUserIdxFromJwt(req.headers.authorization)); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

async function postBadge(req, res) {
    try {
        const { course_idx } = req.body;
        const result = await userService.postBadge(getUserIdxFromJwt(req.headers.authorization), course_idx); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

module.exports = {
    getMypage,
    putMypage,
    getBadge,
    postBadge,
};
