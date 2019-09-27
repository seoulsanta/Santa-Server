const mysql = require('../library/mysql');
const { getRefreshToken } = require('../library/jwtCheck');

async function selectUserIdxById(id) {
    const sql = `
    SELECT user_idx
    FROM Santa.USER
    WHERE id = (?);
    `;

    const result = await mysql.query(sql, [id]);

    return result
}

async function insertUser(id, name, img) {
    const sql = `
    INSERT INTO USER 
    (id, name, img, rfrs_token)
    VALUES
    (?, ?, ?);
    `;

    const refreshToken = getRefreshToken(newUserIdx);

    const result = await mysql.query(sql, [id, name, img, refreshToken]);

    return result
}

async function updateRefreshToken(user_idx, rfrs_token) {
    const sql = `
    UPDATE USER 
    SET rfrs_token = ?
    WHERE user_idx = ?
    `;

    const result = await mysql.query(sql, [rfrs_token, user_idx]);

    return result
}

module.exports = {
    selectUserIdxById,
    insertUser,
    updateRefreshToken,
};