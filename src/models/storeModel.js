const pool = require('../services/db');

// SQL Statement to Select ALL items in Store

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Store;
    `;

pool.query(SQLSTATMENT, callback);
    
}

// SQL Statement to Select Item in Store by Item ID

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Store
    WHERE item_id = ?;
    `;
const VALUES = [data.item_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Select User By ID

module.exports.selectUserById = (data, callback) =>
{
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

// SQL Statement to Select Item User wishes to purchase

module.exports.purchaseItemByID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Store
    WHERE item_id = ?
    `;
const VALUES = [data.item_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to decrease quantity of item in Store by 1

module.exports.updateItemById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Store
    SET quantity = quantity - 1 
    WHERE item_id = ? AND quantity > 0;
    `;
const VALUES = [data.item_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Insert New Item in Store

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Store (itemName, description, cost, quantity)
    VALUES (?, ?, ?, ?);
    `;
const VALUES = [data.itemName, data.description, data.cost, data.quantity];

pool.query(SQLSTATMENT, VALUES, callback);
    
}