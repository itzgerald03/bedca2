const model = require("../models/inventoryModel");


// Add Item to Inventory Table
module.exports.addItem = (req, res, next) => {

    const data = {
        user_id: res.locals.userid,
        itemName: res.locals.itemName,
        description: res.locals.description,
        points: res.locals.reward
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addPurchase:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({message: `Item successfully purchased!`});
        }
    }

    model.insertPurchaseToInv(data, callback);
}



// Extract Items based on User ID
module.exports.selectItemsById = (req, res, next) => {
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
                    message: "User does not have any items in the Inventory."
                });
            }
            else {
                res.status(200).json(results);
            }
        }
    }

    model.selectById(data, callback);
}

// Read all Items in Inventory
module.exports.readAllItemsInInventory = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllItemsInInventory:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
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


// Middleware to check if inventory_id exist
module.exports.inventoryIdExistCheck = (req, res, next) => {


    data = {
        inventory_id: req.params.inventory_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error inventoryIdExistCheck:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Item does not exist."
                });
            }
            else {
                next();
            }
        }
    }

    model.selectItemById(data, callback);
}


// Deletes Item from Inventory Table by user_id
module.exports.deleteInvItemById = (req, res, next) => {
    const data = {
        inventory_id: req.params.inventory_id,
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteInvItemById:", error);
            res.status(500).json(error);
        } else {
            if (results[0].affectedRows == 0){
                res.status(409).json({
                    message: "Item is not associated with the user."
                })

            }   
            else {
                res.status(200).json({
                    message: "Item has been deleted from your Inventory."
                })
            }
        }
    }

    model.deleteById(data, callback);
}

// Deletes Inventory associated with user_id
module.exports.deleteInventoryByUserId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteInventoryByUserId:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteByUserId(data, callback);
}
