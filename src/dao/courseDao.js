const mysql = require('../library/mysql');
const s3Location = require('../../config/s3Config').s3Location;

async function selectCourse(course_idx) {
    const sql = `
    SELECT course_idx, mountain_idx, name as course_name, img as course_img, time, degree
    FROM Santa.COURSE
    WHERE course_idx = (?);
    `;

    const result = await mysql.query(sql, [course_idx]);

    return result
}

async function selectMountainByIdx(mountain_idx) {
    const sql = `
    SELECT name, content, img
    FROM Santa.MOUNTAIN
    WHERE mountain_idx = (?);
    `;

    const result = await mysql.query(sql, [mountain_idx]);

    return result
}

async function selectCourseLine(course_idx) {
    const sql = `
    SELECT longitude, latitude
    FROM Santa.COURSE_LINE
    WHERE course_idx = (?)
    ORDER BY course_line_idx ASC;
    `;

    const result = await mysql.query(sql, [course_idx]);

    return result
}

module.exports = {
    selectCourse,
    selectMountainByIdx,
    selectCourseLine,
};