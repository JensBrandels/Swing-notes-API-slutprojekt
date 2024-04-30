const express = require("express");
const notes = require("../Controllers/NotesController");
const { authenticateToken } = require("../Middlewares/AuthMiddleware");
const router = express.Router();

router.post("/notes", authenticateToken, notes.createNote.post);
router.get("/notes", authenticateToken, notes.getUserNotes.get);
router.put("/notes/:id", authenticateToken, notes.modifyUserNote.put);
router.delete("/notes/:id", authenticateToken, notes.deleteUserNote.delete);
router.get("/notes/search", authenticateToken, notes.searchThroughNotes.get);

module.exports = router;
