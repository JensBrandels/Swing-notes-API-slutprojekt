const express = require("express");
const users = require("../Controllers/UsersController");
const router = express.Router();

router.post("/", users.post);

module.exports = router;
