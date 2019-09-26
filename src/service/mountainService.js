const mountainDao = require('../dao/mountainDao');

async function getMountain() {
    // get mountain info (idx, name)
    let res = await mountainDao.selectMountain();
    
    for (let i=0; i<res.length; i++){
        // get course info by mountainIdx (idx, name, img, time, degree)
        res[i].course = await mountainDao.selectCourseByMountainIdx(res[i].mountain_idx);
    }
    
    return res;
}

module.exports = {
    getMountain,
};
