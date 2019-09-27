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

module.exports = {
    getMypage,
};
