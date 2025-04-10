const express = require("express");
const UserController = require("../controllers/UserController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile", verifyToken, UserController.getUserProfile);

module.exports = router;
