const express = require('express');
const router = express.Router();


const controller = require('../controllers/userController')
const progressController = require("../controllers/progressController")
const historyController = require("../controllers/historyController")
const inventoryController = require("../controllers/inventoryController")


// Route to Read all Users.
router.get("/", controller.readAllUsers);


// Route to Select a User based on user_id.
router.get('/:user_id', controller.selectUserById);


// Route to Create new User.
router.post("/", controller.emailChecking, controller.createNewUser);


// Route to Update User Information.
router.put('/:user_id', controller.selectUserByIdMiddleware, controller.usernameChecking, controller.emailChecking, controller.updateUserById);


// Route to Delete User.
router.delete('/:user_id', controller.deleteUserById, progressController.deleteProgressByUserId, historyController.deleteHistoryByUserId, inventoryController.deleteInventoryByUserId);


module.exports = router;    