const express = require("express");
const router = express.Router();

const jwtMiddleware = require("../middlewares/jwtMiddleware")
const bcryptMiddleware = require("../middlewares/bcryptMiddleware")
const userController = require("../controllers/userController")



const taskRoutes = require('./taskRoutes');
const userRoutes = require("./userRoutes");
const progressRoutes = require("./progressRoutes");
const inventoryRoutes = require('./inventoryRoutes');
const questRoutes = require('./questRoutes');
const storeRoutes = require('./storeRoutes');
const historyRoutes = require('./historyRoutes');
const messageRoutes = require('./messageRoutes');

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);
router.use("/task_progress", progressRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/quests", questRoutes);
router.use("/store", storeRoutes);
router.use("/history", historyRoutes);
router.use("/message", messageRoutes);


router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/jwt/generate", jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken);
router.post("/bcrypt/compare", bcryptMiddleware.comparePassword);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword);



module.exports = router;