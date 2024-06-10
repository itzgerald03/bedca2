const model = require("../models/storeModel");

// Read all items in Store SQL Table
module.exports.readAllItems = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllItems:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


// Extract Item from Store based on ItemID
module.exports.selectItemById = (req, res, next) => {
    const data = {
        item_id: req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectItemById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Item not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}



// Middleware to check if user_id exist
module.exports.useridExistCheck = (req, res, next) => {
    const data = {
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
                res.locals.totalpoints = results[0].total_points
                next();
            }
        }
    }

    model.selectUserById(data, callback);
}

// Purchase Item from Store based on ItemID
module.exports.purchaseItemById = (req, res, next) => {
    const data = {
        item_id: req.params.item_id,
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error purchaseItemById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Item not found"
                });
            }
            else if (results[0].quantity == 0) {
                res.status(403).json({
                    message: "Item is Out Of Stock"
                });
            }
            else if (res.locals.totalpoints < results[0].cost) {
                res.status(403).json({
                    message: "Insufficient points"
                });
            }

            else {
                res.locals.userid = req.params.user_id;
                res.locals.itemName = results[0].itemName;
                res.locals.description = results[0].description;
                res.locals.cost = results[0].cost;
                next();
            }
        }
    }

    model.selectById(data, callback);
}


// Update Item Quantity by Item ID
module.exports.updateItemById = (req, res, next) => {
    const data = {
        item_id: req.params.item_id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateItemById:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }


    model.updateItemById(data, callback);
}



// Creates a new Item in Store
module.exports.createNewItem = (req, res, next) => {
    if (req.body.itemName == undefined || req.body.description == undefined || req.body.cost == undefined || req.body.quantity == undefined) {
        res.status(400).send("Error: itemName, description, cost or quantity is undefined");
        return;
    }


    if (Number.isInteger(req.body.cost) == false || Number.isInteger(req.body.quantity) == false) {
        res.status(400).send("Error: Cost and Quantity must be an Integer");
        return;
    }

    const data = {
        itemName: req.body.itemName,
        description: req.body.description,
        cost: req.body.cost,
        quantity: req.body.quantity
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewItem:", error);
            res.status(500).json(error);
        } else {
            newItem = {
                "item_id": results.insertId,
                "name": data.itemName,
                "description": data.description,
                "cost": data.cost,
                "quantity": data.quantity
            }
            res.status(201).json(newItem);
        }
    }

    model.insertSingle(data, callback);
}