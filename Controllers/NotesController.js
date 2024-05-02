const {
  addNote,
  getDateAndTime,
  findUserNotesByNoteId,
  updateNoteInDb,
  deleteNote,
  searchForNotes,
  findUserNotesByUserid,
} = require("../Services/NotesServices");

//here's the POST for notes

const createNote = {
  post: async (req, res) => {
    const { title, text } = req.body;
    const userId = req.user.id; //getting the userID from the request from my middleware authentication

    try {
      if (title == "" || text == "") {
        res
          .status(406)
          .send({ message: "Notes need to have a Title AND text!" });
        return;
      }
      if (title.length > 50) {
        return res
          .status(400)
          .send({ message: "Title can't be longer than 50 characters" });
      }

      if (text.length > 300) {
        return res
          .status(400)
          .send({ message: "Text can't be longer than 300 characters" });
      }

      const createdNote = {
        userId: userId,
        title: title,
        text: text,
        createdAt: getDateAndTime(),
        modifiedAt: getDateAndTime(),
      };

      await addNote(createdNote);
      res.status(200).send({
        message: "Note has been added successfully!",
        note: createdNote,
      });
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

//here's the GET for Notes

const getUserNotes = {
  get: async (req, res) => {
    const userId = req.user.id;

    try {
      const allNotes = await findUserNotesByUserid(userId);

      if (allNotes.length == 0) {
        return res
          .status(404)
          .send({ message: "No notes found for this user!" });
      }

      res.status(200).send(allNotes);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

//here's the DELETE for notes

const deleteUserNote = {
  delete: async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    try {
      const foundNote = await findUserNotesByNoteId(id, userId);
      if (!foundNote) {
        return res.status(404).send({ message: "Note not found!" });
      }
      const deletedNote = await deleteNote(foundNote._id);
      res
        .status(200)
        .send({ message: "Note deleted!", deletedNote: deletedNote });
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

//here's the PUT for notes

const modifyUserNote = {
  put: async (req, res) => {
    const id = req.params.id;
    const { text, title } = req.body;
    const userId = req.user.id;

    try {
      const foundNote = await findUserNotesByNoteId(id, userId);
      if (!foundNote) {
        return res.status(404).send({ message: "Note not found!" });
      }

      const updatedNote = {
        title: (foundNote.title = title || foundNote.title),
        text: (foundNote.text = text || foundNote.text),
        modifiedAt: (foundNote.modifiedAt = getDateAndTime()),
      };

      const changedNote = await updateNoteInDb(id, updatedNote);
      res.status(200).send({
        message: "Note updated successfully!",
        notesChanged: changedNote,
      });
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

//VG-KRAVET -- GET request för att söka bland usernotes

const searchThroughNotes = {
  get: async (req, res) => {
    const userId = req.user.id;
    const { title } = req.query;

    if (title == "") {
      return res
        .status(400)
        .send({ message: "You can't search on nothing ;)" });
    }

    try {
      const allNotes = await findUserNotesByUserid(userId); //first get all notes from user
      const filteredNotes = await searchForNotes(allNotes, title);
      res.status(200).send({
        message: "These are the notes you found!",
        notes: filteredNotes,
      });
    } catch (error) {
      res.sendStatus(500);
    }
  },
};

module.exports = {
  createNote,
  getUserNotes,
  deleteUserNote,
  modifyUserNote,
  searchThroughNotes,
};
