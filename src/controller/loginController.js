const loginService = require('../service/loginService');
const { response, errorResponse } = require('../library/response');

async function postKakao(req, res) {
    try {
        const result = await loginService.postKakao(req.headers.accesstoken); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}


async function postNaver(req, res) {
    try {
        const result = await loginService.postNaver(req.headers.accesstoken); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

module.exports = {
    postKakao,
    postNaver,
};
