const notesDB = require("../Models/NotesModel");

const addNote = async (note) => {
  console.log("note", note);
  try {
    await notesDB.insert(note);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addNote };
