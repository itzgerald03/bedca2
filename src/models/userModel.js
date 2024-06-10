const pool = require('../services/db');

// SQL Statement to Insert New User

module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);

}

// SQL Statement to Select all Users

module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

    pool.query(SQLSTATMENT, callback);

}

// SQL Statement to Select User by User ID

module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT User.user_id, User.username, User.email, (IFNULL(SUM(Task.points), 0) + (SELECT IFNULL(SUM(points), 0) FROM History WHERE user_id = User.user_id)) AS total_points
    FROM User
    LEFT JOIN TaskProgress ON User.user_id = TaskProgress.user_id
    LEFT JOIN Task ON TaskProgress.task_id = Task.task_id
    WHERE User.user_id = ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Update User by User ID

module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ? ,email = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Delete User by User ID

module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Check if Email is already Used

module.exports.checkEmail = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE email = ?;
    `;
    const VALUES = [data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Check if Username is already Used

module.exports.checkUsername = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////


module.exports.selectByUsernameOrEmail = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ? OR email = ?;
    `;
const VALUES = [data.username, data.email];

pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////

module.exports.selectByUser = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
const VALUES = [data.username];

pool.query(SQLSTATMENT, VALUES, callback);
}

