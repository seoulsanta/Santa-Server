const mysql = require('../library/mysql');
const s3Location = require('../../config/s3Config').s3Location;

async function selectMountain() {
    const sql = `
    SELECT mountain_idx, name as mountain_name
    FROM Santa.MOUNTAIN;
    `;

    const result = await mysql.query(sql, []);

    return result
}

async function selectCourseByMountainIdx(mountain_idx, flag) {
    let sql;
    if (flag){
        sql = `
        SELECT course_idx, name as course_name, img as course_img, time, degree
        FROM Santa.COURSE
        WHERE mountain_idx = (?);
        `;
    } else {
        sql = `
        SELECT course_idx, name as course_name, img as course_img
        FROM Santa.COURSE
        WHERE mountain_idx = (?);
        `;
    }

    const result = await mysql.query(sql, [mountain_idx]);

    return result
}

async function selectMountainByWord(word) {
    const sql = `
    SELECT mountain_idx, name as mountain_name, altitude as mountain_altitude
    FROM Santa.MOUNTAIN
    WHERE name LIKE ?;
    `;

    const result = await mysql.query(sql, ['%'+word+'%']);

    return result
}

async function selectThemeByCourseIdx(course_idx) {
    const sql = `
    SELECT theme_idx
    FROM Santa.THEME_COURSE
    WHERE course_idx = (?);
    `;

    const result = await mysql.query(sql, [course_idx]);

    const sql2 = `
    SELECT name
    FROM Santa.THEME
    WHERE theme_idx = (?);
    `;

    const result2 = await mysql.query(sql2, [result[0].theme_idx]);
    
    return result2[0].name
}

module.exports = {
    selectMountain,
    selectCourseByMountainIdx,
    selectMountainByWord,
    selectThemeByCourseIdx,
};