const model = require("../models/historyModel");

// Add Purchase to History Table
module.exports.addPurchase = (req, res, next) => {

    const data = {
        user_id: res.locals.userid,
        itemName: res.locals.itemName,
        description: res.locals.description,
        cost: res.locals.cost
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addPurchase:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.insertPurchase(data, callback);
}

// Add Completed Quest to History Table
module.exports.addCompletedQuest = (req, res, next) => {

    const data = {
        user_id: res.locals.userid,
        questName: res.locals.questName,
        description: res.locals.description,
        reward: res.locals.reward
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addCompletedQuest:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({message: "Quest Completed!"})
        }
    }

    model.insertQuest(data, callback);
}

// Middleware to check if user_id exist
module.exports.useridExistCheck = (req, res, next) => {


    data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error useridExistCheck:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0 || results[0].user_id == null) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                next();
            }
        }
    }

    model.selectUserById(data, callback);
}


// Extract Items based on User ID
module.exports.selectHistoryById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectItemsById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User does not have any data in History."
                });
            }
            else {
                res.status(200).json(results);
            }
        }
    }

    model.selectById(data, callback);
}


// Extract Items based on Type
module.exports.selectHistoryByType = (req, res, next) => {

    if (req.params.type.toLowerCase() != "quest" && req.params.type.toLowerCase() != "purchase") {
        res.status(400).send("Error: Invalid type");
        return;
    }

    const data = {
        user_id: req.params.user_id,
        type: req.params.type
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectHistoryByType:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: 
                    `User does not have any ${type} data in History.`
                });
            }
            else {
                res.status(200).json(results);
            }
        }
    }

    model.selectByType(data, callback);
}


// Deletes History associated with user_id
module.exports.deleteHistoryByUserId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteHistoryByUserId:", error);
            res.status(500).json(error);
        } else {
            next(); // 204 No Content            
        }
    }

    model.deleteByUserId(data, callback);
}

