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

async function insertUserTransaction(id, name, img) {
    const sql1 = `
    INSERT INTO USER 
    (id, name, img)
    VALUES
    (?, ?, ?);
    `;

    const sql2 = `
    UPDATE USER 
    SET rfrs_token = ?
    WHERE user_idx = ?
    `;
  
    await mysql.transaction(async (connection) => {
        const newUser = await connection.query(sql1, [id, name, img]);

        const refreshToken = getRefreshToken(newUser.insertId);
        
        await connection.query(sql2, [refreshToken, newUser.insertId]);
    });
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
    insertUserTransaction,
    updateRefreshToken,
};