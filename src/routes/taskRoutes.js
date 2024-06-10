const express = require('express');
const router = express.Router();


const controller = require('../controllers/taskController')
const progressController = require("../controllers/progressController")


// Route to Read all Tasks
router.get("/", controller.readAllTasks);

// Route to Read all Task by ID
router.get('/:task_id', controller.selectTaskById);

// Route to Create new Task
router.post("/", controller.createNewTask);

// Route to Update Task by ID
router.put('/:task_id', controller.updateTaskById);

// Route to Delete Task by ID
router.delete('/:task_id', controller.checkTaskId, controller.deleteTaskById, progressController.deleteProgressByTaskId);

module.exports = router;