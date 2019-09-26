const mountainService = require('../service/mountainService');
const { response, errorResponse } = require('../library/response');

async function getMountain(req, res) {
    try {
        const result = await mountainService.getMountain(); 
        response('Success', result, res, 200);
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

async function getMountainSearch(req, res) {
    try {
        if (req.query.query == ''){
            errorResponse("Not Found.", res, 404);
        } else {
            const result = await mountainService.getMountainSearch(req.query.query); 
            response('Success', result, res, 200);
        }
    } catch (error) {
        console.log(error);
        errorResponse(error.message, res, error.statusCode);
    }
}

module.exports = {
    getMountain,
    getMountainSearch,
};
