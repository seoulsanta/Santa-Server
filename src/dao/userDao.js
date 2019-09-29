const mysql = require('../library/mysql');

async function selectUserByIdx(user_idx) {
    const sql = `
    SELECT name, img
    FROM Santa.USER
    WHERE user_idx = (?);
    `;

    const result = await mysql.query(sql, [user_idx]);

    return result[0];
}

async function selectBadgeByUserIdx(user_idx) {
    const sql = `
    SELECT badge_idx, course_idx, date
    FROM Santa.BADGE
    WHERE user_idx = (?);
    `;

    return await mysql.query(sql, [user_idx]);
}

async function selectCourseNameByIdx(course_idx) {
    const sql = `
    SELECT name, degree
    FROM Santa.COURSE
    WHERE course_idx = (?);
    `;

    const result = await mysql.query(sql, [course_idx]);

    return result[0];
}

async function selectCourseCnt() {
    const sql = `
    SELECT COUNT(course_idx) as cnt
    FROM Santa.COURSE;
    `;

    const result = await mysql.query(sql, []);

    return result[0].cnt;
}

async function updateUser(user_idx, name, img) {
    if (img==null) {
        const sql = `
        UPDATE Santa.USER
        SET name = (?)
        WHERE user_idx = (?);
        `;

        await mysql.query(sql, [name, user_idx]);

    } else {
        const sql = `
        UPDATE Santa.USER
        SET name = (?), img = (?)
        WHERE user_idx = (?);
        `;

        await mysql.query(sql, [name, img, user_idx]);
        
    }
}

async function insertBadge(user_idx, course_idx) {
    const sql = `
    INSERT INTO BADGE 
    (user_idx, course_idx)
    VALUES
    (?, ?);
    `;

    await mysql.query(sql, [user_idx, course_idx]);
}

module.exports = {
    selectUserByIdx,
    selectBadgeByUserIdx,
    selectCourseNameByIdx,
    selectCourseCnt,
    updateUser,
    insertBadge,
};