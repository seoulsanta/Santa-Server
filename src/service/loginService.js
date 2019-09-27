const loginDao = require('../dao/loginDao');
const rp = require('request-promise-native');
const { sign, getRefreshToken } = require('../library/jwtCheck');

async function requestKakao(accesstoken){
    let options = {
        uri: 'https://kapi.kakao.com/v2/user/me',
        headers: {
            Authorization: `Bearer ${accesstoken}`
        },
        json: true
    };

    const result = await rp(options);

    if (result.statusCode!=undefined){
        throw {message: result.name, statusCode: result.statusCode};
    }

    return {id: `kakao/${result.id}`, name: result.properties.nickname, img: result.properties.thumbnail_image};
}

async function requestNaver(accesstoken){
    let options = {
        uri: 'https://openapi.naver.com/v1/nid/me',
        headers: {
            Authorization: `Bearer ${accesstoken}`
        },
        json: true
    };

    const result = await rp(options);

    if (result.statusCode!=undefined){
        throw {message: result.name, statusCode: result.statusCode};
    }

    return result;
}

async function postKakao(accesstoken) {
    // request to kakao server
    const userInfo = await requestKakao(accesstoken);
    // get user info from kakao's response
    // id, name, img

    // check if DB have `id`
    const user = await loginDao.selectUserIdxById(userInfo.id);

    let newToken;
    let refreshToken;
    // new user
    if (user.length==0){
        await loginDao.insertUserTransaction(userInfo.id, userInfo.name, userInfo.img);

        const newUser = await loginDao.selectUserIdxById(userInfo.id);

        newToken = sign(newUser[0].user_idx);
        refreshToken = newUser[0].refresh_token;
    } else {
        const userIdx = user[0].user_idx;

        newToken = sign(userIdx);
        refreshToken = getRefreshToken(userIdx);
        await loginDao.updateRefreshToken(userIdx, refreshToken);
    }
    // in all case, send user's token having info(idx, name, img) and refresh token
    
    return {
        authorization: newToken,
        refreshtoken: refreshToken,
    };
}

async function postNaver(accesstoken) {
    // request to naver server
    const userInfo = await requestNaver(accesstoken);
    console.log(userInfo);
    // get user info from naver's response
    // id, nickname, profile_img

    userInfo.id = `naver/${userInfo.id}`;

    // check if DB have `id`
    const user = await loginDao.selectUserIdxById(userInfo.id);

    let newToken;
    let refreshToken;
    // new user
    if (user.length==0){
        await loginDao.insertUser(userInfo.id, userInfo.nickname, userInfo.profile_img);

        const newUser = await loginDao.selectUserIdxById(userInfo.id);

        newToken = sign(newUser[0].user_idx);
        refreshToken = newUser[0].refresh_token;
    } else {
        const userIdx = user[0].user_idx;

        newToken = sign(userIdx);
        refreshToken = getRefreshToken(userIdx);
        await loginDao.updateRefreshToken(userIdx, refreshToken);
    }
    // in all case, send user's token having info(idx, name, img) and refresh token
    
    return {
        authorization: newToken,
        refreshtoken: refreshToken,
    };
}

module.exports = {
    postKakao,
    postNaver,
};
