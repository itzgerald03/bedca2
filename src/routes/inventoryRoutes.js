const express = require('express');
const router = express.Router();


const controller = require('../controllers/inventoryController');

// Route to Read all items in Inventory
router.get('/',controller.readAllItemsInInventory);

// Route to Read all items in Inventory based on User ID
router.get('/:user_id', controller.useridExistCheck, controller.selectItemsById);

// Route to Delete item in Inventory
router.delete("/:inventory_id/user/:user_id", controller.useridExistCheck, controller.inventoryIdExistCheck, controller.deleteInvItemById)


module.exports = router;