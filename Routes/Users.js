const express = require("express");
const users = require("../Controllers/UsersController");
const router = express.Router();

router.post("/user/signup", users.post);

module.exports = router;
