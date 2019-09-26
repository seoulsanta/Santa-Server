const mountainDao = require('../dao/mountainDao');

async function getMountain() {
    // get mountain info (idx, name)
    let res = await mountainDao.selectMountain();
    
    for (let i=0; i<res.length; i++){
        // get course info by mountainIdx (idx, name, img, time, degree)
        res[i].course = await mountainDao.selectCourseByMountainIdx(res[i].mountain_idx, true);
    }
    
    return res;
}

async function getMountainSearch(word) {
    // get mountain info (idx, name, altitude)
    let res = await mountainDao.selectMountainByWord(word);

    if (res.length==0){
        throw {message:"Not Found.", statusCode:404};
    }

    res = res[0];

    // get course info by mountainIdx (idx, name, img)
    res.course = await mountainDao.selectCourseByMountainIdx(res.mountain_idx, false);

    // add theme_name
    for (let i=0; i<res.course.length; i++){
        res.course[i].theme_name = await mountainDao.selectThemeByCourseIdx(res.course[i].course_idx);
    }
    
    
    return res;
}

module.exports = {
    getMountain,
    getMountainSearch,
};
