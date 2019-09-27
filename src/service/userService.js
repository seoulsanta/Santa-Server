const userDao = require('../dao/userDao');

async function getMypage(user_idx) {
    let res = await userDao.selectUserByIdx(user_idx);

    return res;
}

async function putMypage(user_idx, name, img) {
    await userDao.updateUser(user_idx, name, img);
}

async function getBadge(user_idx) {
    let badge = await userDao.selectBadgeByUserIdx(user_idx);

    for (let i=0; i<badge.length; i++){
        badge[i].course_name = await userDao.selectCourseNameByIdx(badge[i].course_idx);
    }

    let res = {};

    res.count = badge.length;
    res.total = await userDao.selectCourseCnt();
    res.badge = badge;

    return res;
}

module.exports = {
    getMypage,
    putMypage,
    getBadge
};
