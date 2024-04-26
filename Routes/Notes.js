const express = require("express");
const notes = require("../Controllers/NotesController");
const { authenticateToken } = require("../Middlewares/AuthMiddleware");
const router = express.Router();

router.post("/notes", authenticateToken, notes.createNote.post);

module.exports = router;
