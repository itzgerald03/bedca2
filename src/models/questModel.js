const pool = require('../services/db');

// SQL Statement to Select ALL Quests

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Quest;
    `;

pool.query(SQLSTATMENT, callback);
    
}

// SQL Statement to Select Quest by Quest ID

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Quest
    WHERE quest_id = ?;
    `;
const VALUES = [data.quest_id];

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

// SQL Statement to Insert New Quest

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Quest (name, description, reward, difficulty)
    VALUES (?, ?, ?, ?);
    `;
const VALUES = [data.name, data.description, data.reward, data.difficulty];

pool.query(SQLSTATMENT, VALUES, callback);
    
}

// SQL Statement to Delete Quest by Quest ID

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Quest 
    WHERE quest_id = ?;

    ALTER TABLE Task AUTO_INCREMENT = 1;
    `;
const VALUES = [data.quest_id];

pool.query(SQLSTATMENT, VALUES, callback);
}


// SQL Statement to Delete ALL History by Quest ID

module.exports.deleteByName = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM History 
    WHERE name = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
const VALUES = [data.name];

pool.query(SQLSTATMENT, VALUES, callback);
}