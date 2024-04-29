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

const findUserNotes = async (username) => {
  try {
    return await notesDB.find({ user: username });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch user notes");
  }
};

module.exports = { addNote, findUserNotes, getDateAndTime };
