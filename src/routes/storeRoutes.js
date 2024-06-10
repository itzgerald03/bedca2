const express = require('express');
const router = express.Router();


const controller = require('../controllers/storeController');
const historyController = require("../controllers/historyController");
const inventoryController = require("../controllers/inventoryController");

// Route to Read all Items in the Store
router.get('/', controller.readAllItems);

// Route to Read Item in the Store based on Item ID
router.get('/:item_id', controller.selectItemById);

// Route to Create new Item in Store
router.post("/", controller.createNewItem);

// Route to allow User to purchase Item in Store
router.put("/purchase/:item_id/user/:user_id", controller.useridExistCheck, controller.purchaseItemById, controller.updateItemById, historyController.addPurchase, inventoryController.addItem);

module.exports = router;