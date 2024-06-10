const pool = require('../services/db');

// SQL Statement to Insert User's Purchase in History Table

module.exports.insertPurchase = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO History (user_id, name, type, description, points, completion_date)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
    `;
const VALUES = [data.user_id, data.itemName, "Purchase", data.description, -data.cost];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Insert User's Completed Quest in History Table

module.exports.insertQuest = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO History (user_id, name, type, description, points, completion_date)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP);
    `;
const VALUES = [data.user_id, data.questName, "Quest", data.description, data.reward];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Select User By ID 

module.exports.selectUserById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Select History By User ID 

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM History
    WHERE user_id = ?;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Select History By User ID and Type

module.exports.selectByType = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM History
    WHERE type = ? AND user_id = ?;
    `;
const VALUES = [data.type, data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Delete History By User ID
module.exports.deleteByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM History 
    WHERE user_id = ?;

    ALTER TABLE History AUTO_INCREMENT = 1;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}