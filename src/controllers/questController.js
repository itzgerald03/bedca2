const model = require("../models/questModel");


// Read all Quest in Quest SQL Table
module.exports.readAllQuests = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuests:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


// Extract Quest based on Quest ID
module.exports.selectQuestById = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectQuestById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Quest does not exist"
                });
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    }

    model.selectById(data, callback);
}


// Middleware Extract Quest based on Quest ID
module.exports.selectQuestByIdMiddleware = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectQuestById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Quest does not exist"
                });
            }
            else {
                res.locals.questName = results[0].name;
                res.locals.description = results[0].description;
                res.locals.reward = results[0].reward;
                next();
            }
        }
    }

    model.selectById(data, callback);
}

// Middleware to check if user_id exist
module.exports.useridExistCheck = (req, res, next) => {

    if (req.body.user_id == undefined) {
        res.status(400).send("User ID in body is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id
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
                res.locals.userid = data.user_id
                next();
            }
        }
    }

    model.selectUserById(data, callback);
}


// Creates a new Quest in SQL Table
module.exports.createNewQuest = (req, res, next) => {
    if (req.body.name == undefined || req.body.description == undefined || req.body.reward == undefined || req.body.difficulty == undefined) {
        res.status(400).send("Error: title, description, reward or difficulty is undefined");
        return;
    }

    if (req.body.difficulty.toLowerCase() != "easy" && req.body.difficulty.toLowerCase() != "moderate" && req.body.difficulty.toLowerCase() != "hard") {
        res.status(400).send("Error: Invalid Difficulty Type ( Easy / Moderate / Hard )");
        return;
    }

    if (Number.isInteger(req.body.reward) == false) {
        res.status(400).send("Error: Reward must be an Integer");
        return;
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        reward: req.body.reward,
        difficulty: req.body.difficulty
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuest:", error);
            res.status(500).json(error);
        } else {
            newQuest = {
                "quest_id": results.insertId,
                "name": data.name,
                "description": data.description,
                "reward": data.reward,
                "difficulty": data.difficulty
            }
            res.status(201).json(newQuest);
        }
    }

    model.insertSingle(data, callback);
}

// Checks quest_id exist
module.exports.checkQuestId = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkQuestId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Quest ID not found"
                });
            }
            else {
                res.locals.name = results[0].name;
                next();
            };
        }
    }

    model.selectById(data, callback);
}

// Deletes Quest from SQL Table by quest_id
module.exports.deleteQuestById = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteQuestById:", error);
            res.status(500).json(error);
        } else {
                next();     
        }
    }

    model.deleteById(data, callback);
}


// Deletes History associated with quest_id
module.exports.deleteHistoryByName = (req, res, next) => {
    const data = {
        name: res.locals.name
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteHistoryByQuestId:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteByName(data, callback);
}
