const express = require('express');
const router = express.Router();


const controller = require('../controllers/progressController');
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");



// Route to Select Progress by ID
router.get('/:progress_id', controller.selectProgressById);

// Route to Select Progress by ID
router.get('/user/:user_id', controller.selectProgressTitle);

// Route to Complete Task
router.post("/", userController.checkUserById, taskController.checkTaskById, controller.completeTask)

// Route to Update Completed Task
router.put("/:progress_id", controller.updateProgressById, controller.showUpdatedProgress);

// Route to Delete Completed Task
router.delete("/:progress_id", controller.checkProgressId, controller.deleteProgressById)


module.exports = router;