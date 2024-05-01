const express = require("express");
const users = require("../Controllers/UsersController");
const router = express.Router();

//Endpoint to create a new user
router.post("/user/signup", users.createUser.post);

//Endpoint for user login
router.post("/user/login", users.loginUser.post);

module.exports = router;
