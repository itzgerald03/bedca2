const model = require("../models/progressModel");

// Allows User to complete a Task in SQL Table
module.exports.completeTask = (req, res, next) => {
    if (req.body.completion_date == undefined) {
        res.status(400).send("Error: Completetion Date is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error completeTask:", error);
            res.status(500).json(error);
        } else {
            completedTask = {
                "progress_id": results.insertId,
                "user_id": req.body.user_id,
                "task_id": req.body.task_id,
                "completion_date": req.body.completion_date,
                "notes": req.body.notes
            }
            res.status(201).json(completedTask);
        }
    }

    model.insertSingle(data, callback);
}


// Extract User from SQL Table based on user_id
module.exports.selectProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectProgressById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Progess ID not found"
                });
            }
            else {
                progress = {
                    "task_name": abc ,
                    "progress_id": results[0].progress_id,
                    "user_id": results[0].user_id,
                    "task_id": results[0].task_id,
                    "completion_date": results[0].completion_date.slice(0,10),
                    "notes": results[0].notes
                }

                res.status(200).json(progress);
            }
        }
    }

    model.selectById(data, callback);
}


// Update Progess from SQL Table based on progress_id
module.exports.updateProgressById = (req, res, next) => {
    if (req.body.notes == undefined) {
        res.status(400).json({
            message: "Error: notes is undefined"
        });
        return;
    }

    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateProgressById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Progress ID not found"
                });
            }
            else {
                next();
            }
        }
    }

    model.updateById(data, callback);
}


// Extract Updated Progress from SQL Table based on progress_id
module.exports.showUpdatedProgress = (req, res, next) => {

    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error showUpdatedProgress:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Progess ID not found"
                });
            }
            else{
                updatedProgress = {
                    "progress_id": results[0].progress_id,
                    "user_id": results[0].user_id,
                    "task_id": results[0].task_id,
                    "completion_date": results[0].completion_date.slice(0,10),
                    "notes": results[0].notes
                }
    
                res.status(200).json(updatedProgress);
            }
        }
    }

    model.selectById(data, callback);
}


// Deletes Progress from SQL Table by progress_id
module.exports.deleteProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Progress not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}

// Deletes Progress associated with task_id
module.exports.deleteProgressByTaskId = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteByTaskId(data, callback);
}


// Deletes Progress associated with user_id
module.exports.deleteProgressByUserId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteProgressByUserId:", error);
            res.status(500).json(error);
        } else {
            next(); // 204 No Content            
        }
    }

    model.deleteByUserId(data, callback);
}


// Checks if progress_id exist
module.exports.checkProgressId = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Progress ID not found"
                });
            }
            else {
                next();
            };
        }
    }

    model.selectById(data, callback);
}

// Checks if progress_id exist
module.exports.selectProgressTitle = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectProgressTitle:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User has no Task Progress"
                });
            }
            else {
                res.status(200).json(results)
            };
        }
    }

    model.selectName(data, callback);
}

