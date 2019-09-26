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

async function selectCourseByMountainIdx(mountain_idx) {
    const sql = `
    SELECT course_idx, name as course_name, img as course_img, time, degree
    FROM Santa.COURSE
    WHERE mountain_idx = (?);
    `;

    const result = await mysql.query(sql, [mountain_idx]);

    return result
}

module.exports = {
    selectMountain,
    selectCourseByMountainIdx,
};