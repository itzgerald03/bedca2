const express = require('express');
const router = express.Router();


const controller = require('../controllers/questController');
const historyController = require('../controllers/historyController')


// Route to Read all Quests
router.get('/', controller.readAllQuests);

// Route to Read all Quest By Quest ID
router.get('/:quest_id', controller.selectQuestById);

// Route to Create new Quest
router.post("/", controller.createNewQuest);    

// Route to Complete Quest
router.post('/complete/:quest_id', controller.useridExistCheck, controller.selectQuestByIdMiddleware, historyController.addCompletedQuest);

// Route to Delete Quest by ID
router.delete('/:quest_id', controller.checkQuestId, controller.deleteQuestById, controller.deleteHistoryByName);

module.exports = router;