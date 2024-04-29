const {
  addNote,
  getDateAndTime,
  findUserNotesByUsername,
  findUserNotesByNoteId,
  updateNoteInDb,
} = require("../Services/NotesServices");

//here's the POST for notes

const createNote = {
  post: async (req, res) => {
    const { title, text } = req.body;
    const username = req.user.username; //getting the username from the request from my middleware authentication

    if (title.length > 50) {
      return res
        .status(400)
        .json({ message: "Title can't be longer than 50 characters" });
    }

    if (text.length > 300) {
      return res
        .status(400)
        .json({ message: "Text can't be longer than 300 characters" });
    }

    const createdNote = {
      user: username,
      title: title,
      text: text,
      createdAt: getDateAndTime(),
    };

    try {
      if (title == "" || text == "") {
        res
          .status(406)
          .json({ message: "Notes need to have a Title AND text!" });
        return;
      }
      await addNote(createdNote);
      res.status(200).json({ message: "Note has been added successfully!" });
    } catch (error) {
      res.status(500);
    }
  },
};

//here's the GET for Notes

const getUserNotes = {
  get: async (req, res) => {
    const username = req.user.username;

    if (username == null || username == undefined) {
      res.status(418).json({
        message:
          "Seems like somethings wrong, login again to refresh your token! Username connected to token could not be found!",
      });
      return;
    }

    try {
      const allNotes = await findUserNotesByUsername(username);
      // console.log("Found Notes", allNotes);
      res.status(200).json(allNotes);
    } catch (error) {
      res.status(500).json({ message: "Server went kaboom!" });
    }
  },
};

//here's the DELETE for notes

const deleteUserNote = {
  delete: async (req, res) => {
    //woopwoop
  },
};

//here's the PUT for notes

const modifyUserNote = {
  put: async (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    const username = req.user.username;

    if (username == null || username == undefined) {
      res.status(418).json({
        message: "No note found!",
      });
      return;
    }

    try {
      const foundNote = await findUserNotesByNoteId(id);
      if (!foundNote) {
        return res.status(404).json({ message: "Note not found!" });
      }
      //logga noten för nu
      console.log("foundNote", foundNote);

      const updatedNote = {
        text: (foundNote.text = text || foundNote.text),
        modifiedAt: (foundNote.modifiedAt = getDateAndTime()),
      };

      console.log("updatedNote", updatedNote);
      await updateNoteInDb(id, updatedNote);
      res.status(200).json({ message: "Note updated successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server went kaboom!" });
    }
  },
};
module.exports = { createNote, getUserNotes, deleteUserNote, modifyUserNote };

// const username = req.user.username;

// if (username == null || username == undefined) {
//   res.status(418).json({
//     message:
//       "Seems like somethings wrong, login again to refresh your token! Username connected to token could not be found!",
//   });
// }
