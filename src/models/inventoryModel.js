const pool = require('../services/db');

// SQL Statement to Insert User's Purchase in Inventory Table

module.exports.insertPurchaseToInv = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Inventory (user_id, itemName, description)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.user_id, data.itemName, data.description];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Select Items in Inventory By User ID

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Inventory
    WHERE user_id = ?;
    `;
const VALUES = [data.user_id];

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

// SQL Statement to Select All Items In Inventory

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Inventory;
    `;

pool.query(SQLSTATMENT, callback);

    
}

// SQL Statement to Item in Inventory By ID

module.exports.selectItemById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Inventory
    WHERE inventory_id = ?;
    `;
const VALUES = [data.inventory_id];

pool.query(SQLSTATMENT, VALUES, callback);

}

// SQL Statement to Delete Item in Inventory by User ID and Inventory ID

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM inventory 
    WHERE user_id = ? AND inventory_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
const VALUES = [data.user_id, data.inventory_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Delete ALL Items in Inventory by User ID

module.exports.deleteByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Inventory 
    WHERE user_id = ?;

    ALTER TABLE Inventory AUTO_INCREMENT = 1;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}