const model = require("../models/taskModel");

// Read all Tasks in SQL Table
module.exports.readAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


// Creates a new task in SQL Table
module.exports.createNewTask = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).send("Error: title, description or points is undefined");
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            newTask = {
                "task_id": results.insertId,
                "title": data.title,
                "description": data.description,
                "points": data.points
            }
            res.status(201).json(newTask);
        }
    }

    model.insertSingle(data, callback);
}

// Extract Task from SQL Table based on task_id
module.exports.selectTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}


// Update User from SQL Table based on user_id
module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            message: "Error: title, description or points is undefined"
        });
        return;
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else {
                updatedTask = {
                    "task_id": req.params.task_id,
                    "title": req.body.title,
                    "description": req.body.description,
                    "points": req.body.points
                }
                res.status(200).send(updatedTask); // 204 No Content

            }
        }
    }

    model.updateById(data, callback);
}

// Deletes User from SQL Table by user_id
module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
                next();     
        }
    }

    model.deleteById(data, callback);
}


// Checks if Task exist based on task_id
module.exports.checkTaskById = (req, res, next) => {
    const data = {
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task does not exist"
                });
            }
            else {
                next();
            };
        }
    }

    model.selectById(data, callback);
}


// Checks task_id exist
module.exports.checkTaskId = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task ID not found"
                });
            }
            else {
                next();
            };
        }
    }

    model.selectById(data, callback);
}