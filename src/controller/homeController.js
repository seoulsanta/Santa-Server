const homeService = require('../service/homeService');
const { response, errorResponse } = require('../library/response');

async function getHome(req, res) {
    try {
        const result = await homeService.getHome(); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

module.exports = {
    getHome,
};
