const express = require("express");
const users = require("../Controllers/UsersController");
const router = express.Router();
const { authenticateToken } = require("../Middlewares/AuthMiddleware");

router.post("/user/signup", users.createUser.post);
router.post("/user/login", users.loginUser.post);

module.exports = router;
