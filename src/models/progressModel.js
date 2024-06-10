const pool = require('../services/db');

// SQL Statement to Insert Completed Task in TaskProgress

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);
    `;
const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

pool.query(SQLSTATMENT, VALUES, callback);
    
}

// SQL Statement to Select TaskProgress by Progress ID

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
const VALUES = [data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Update TaskProgress Notes by Progress ID

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE TaskProgress 
    SET notes = ?
    WHERE progress_id = ?;
    `;
const VALUES = [data.notes, data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Delete TaskProgress by Progress ID

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress 
    WHERE progress_id = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
const VALUES = [data.progress_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Delete ALL TaskProgress by User ID

module.exports.deleteByUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress 
    WHERE user_id = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// SQL Statement to Delete ALL TaskProgress by Task ID

module.exports.deleteByTaskId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress 
    WHERE task_id = ?;

    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
const VALUES = [data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}


// SQL Statement to Delete ALL TaskProgress by Task ID

module.exports.selectName = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT taskprogress.user_id, taskprogress.task_id,taskprogress.completion_date, taskprogress.notes, task.title, task.points
    FROM taskprogress
    INNER JOIN task ON taskprogress.task_id = task.task_id
    WHERE user_id = ?

    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

