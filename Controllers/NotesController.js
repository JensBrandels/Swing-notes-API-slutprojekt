const {
  addNote,
  getDateAndTime,
  findUserNotesByUsername,
  findUserNotesByNoteId,
  updateNoteInDb,
  deleteNote,
} = require("../Services/NotesServices");

//here's the POST for notes

const createNote = {
  post: async (req, res) => {
    const { title, text } = req.body;
    const username = req.user.username; //getting the username from the request from my middleware authentication

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
      user: username,
      title: title,
      text: text,
      createdAt: getDateAndTime(),
      modifiedAt: getDateAndTime(),
    };

    try {
      if (title == "" || text == "") {
        res
          .status(406)
          .send({ message: "Notes need to have a Title AND text!" });
        return;
      }
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
    const username = req.user.username;

    try {
      const allNotes = await findUserNotesByUsername(username);
      // console.log("Found Notes", allNotes);
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
    const username = req.user.username;

    try {
      const foundNote = await findUserNotesByNoteId(id, username);
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
    const { text } = req.body;
    const username = req.user.username;

    try {
      const foundNote = await findUserNotesByNoteId(id, username);
      if (!foundNote) {
        return res.status(404).send({ message: "Note not found!" });
      }
      //logga noten för nu
      // console.log("foundNote", foundNote);

      const updatedNote = {
        text: (foundNote.text = text || foundNote.text),
        modifiedAt: (foundNote.modifiedAt = getDateAndTime()),
      };

      // console.log("updatedNote", updatedNote);
      const changedNote = await updateNoteInDb(id, updatedNote);
      res
        .status(200)
        .send({ message: "Note updated successfully!", note: changedNote });
    } catch (error) {
      res.sendStatus(500);
    }
  },
};
module.exports = { createNote, getUserNotes, deleteUserNote, modifyUserNote };
