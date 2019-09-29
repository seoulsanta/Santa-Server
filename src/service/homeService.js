const homeDao = require('../dao/homeDao');

async function getHome() {
    // TODO getWeather 수정
    let res = await homeDao.getWeather();

    const resDust = await homeDao.getDust();

    res.dust = resDust.main;
    res.dust_num = resDust.num;
    res.dust_text = resDust.text;
    
    themes = await homeDao.selectTheme();

    for (let i=0; i<themes.length; i++){
        const idxs = await homeDao.selectCourseIdxByThemeIdx(themes[i].theme_idx);
        let courses = [];
        for (let j=0; j<idxs.length; j++){
            let one = {};
            one.course_idx = idxs[j].course_idx;
            const tmp_mountain = await homeDao.selectMountainIdxByCourseIdx(idxs[j].course_idx)
            const tmp = await homeDao.selectMountainByIdx(tmp_mountain[0].mountain_idx);
            one.mountain_name = tmp[0].name;
            one.mountain_img = tmp[0].img;
            courses.push(one);
        }
        themes[i].course = courses;
    }
    
    res.theme = themes
    return res;
}

module.exports = {
    getHome,
};
