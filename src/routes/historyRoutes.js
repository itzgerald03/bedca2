const express = require('express');
const router = express.Router();


const controller = require('../controllers/historyController');
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");


// Route to Select History based on User ID
router.get('/:user_id', controller.useridExistCheck, controller.selectHistoryById);

// Route to Select History based on User ID & Type
router.get('/:user_id/type/:type', controller.useridExistCheck, controller.selectHistoryByType);


module.exports = router;