const notesDB = require("../Models/NotesModel");

//Funktion för att lägga till notes, med lite extra säkring för fel
const addNote = async (note) => {
  // console.log("note", note);
  try {
    await notesDB.insert(note);
  } catch (error) {
    console.log(error);
  }
};

//Maybe lite overkill, men detta såg jävla snyggt ut så jag ville ha det så :)))
const getDateAndTime = () => {
  let date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  let hours = date_time.getHours();
  let minutes = date_time.getMinutes();
  return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
};

const findUserNotesByUserid = async (userId) => {
  try {
    return await notesDB.find({ userId: userId });
  } catch (error) {
    throw error;
  }
};

const findUserNotesByNoteId = async (id, userId) => {
  try {
    return await notesDB.findOne({ _id: id, userId: userId });
  } catch (error) {
    throw error;
  }
};

const updateNoteInDb = async (id, updatedNote) => {
  try {
    const result = await notesDB.update({ _id: id }, { $set: updatedNote }, {});
    return result;
  } catch (error) {
    console.log("Unable to update note in database");
  }
};

const deleteNote = async (id) => {
  try {
    await notesDB.remove({ _id: id });
    await notesDB.loadDatabase();
    console.log("Note deleted and database refreshed");
  } catch (err) {
    throw new Error("Couldn't delete the note!");
  }
};

const searchForNotes = (allNotes, title) => {
  return allNotes.filter((note) =>
    note.title.toLowerCase().includes(title.toLowerCase())
  );
};

module.exports = {
  addNote,
  findUserNotesByUserid,
  getDateAndTime,
  findUserNotesByNoteId,
  updateNoteInDb,
  deleteNote,
  searchForNotes,
};
