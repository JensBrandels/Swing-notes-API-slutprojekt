const express = require("express");
const notes = require("../Controllers/NotesController");
const { authenticateToken } = require("../Middlewares/AuthMiddleware");
const router = express.Router();

router.post("/", notes.post);
// router.post("/notes", authenticateToken, notesController.createNote.post);

module.exports = router;
