const express = require("express");
const notes = require("../Controllers/NotesController");
const { authenticateToken } = require("../Middlewares/AuthMiddleware");
const router = express.Router();

//Create a note as a logged in user
router.post("/notes", authenticateToken, notes.createNote.post);

//Get a logged in users notes(all of them)
router.get("/notes", authenticateToken, notes.getUserNotes.get);

//Change a specific note with ID from the user that is logged in
router.put("/notes/:id", authenticateToken, notes.modifyUserNote.put);

//Delete a specific note with ID from the user that is logged in
router.delete("/notes/:id", authenticateToken, notes.deleteUserNote.delete);

//Search/filter specific notes based on title for logged in user
router.get("/notes/search", authenticateToken, notes.searchThroughNotes.get);

module.exports = router;
