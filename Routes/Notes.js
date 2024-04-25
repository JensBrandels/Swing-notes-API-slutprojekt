const express = require("express");
const notes = require("../Controllers/NotesController");
const router = express.Router();

router.post("/", notes.post);

module.exports = router;
