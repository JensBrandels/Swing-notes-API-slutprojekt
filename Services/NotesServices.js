const notesDB = require("../Models/NotesModel");

const addNote = async (note) => {
  try {
    await notesDB.insert(note);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addNote };
