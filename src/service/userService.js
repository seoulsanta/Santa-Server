const userDao = require('../dao/userDao');

async function getMypage(user_idx) {
    let res = await userDao.selectUserByIdx(user_idx);

    return res;
}

module.exports = {
    getMypage,
};
