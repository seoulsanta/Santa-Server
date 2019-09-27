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

module.exports = {
    selectUserByIdx,
};