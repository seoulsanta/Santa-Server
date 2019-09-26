const courseDao = require('../dao/courseDao');

async function getCourse(course_idx) {
    let res = await courseDao.selectCourse(course_idx);

    res = res[0];

    // add mountain info
    let mountainInfo = await courseDao.selectMountainByIdx(res.mountain_idx);

    delete res.mountain_idx;

    res.mountain_name = mountainInfo[0].name;
    res.mountain_content = mountainInfo[0].content;
    res.mountain_img = mountainInfo[0].img;

    return res;
}

module.exports = {
    getCourse,
};
