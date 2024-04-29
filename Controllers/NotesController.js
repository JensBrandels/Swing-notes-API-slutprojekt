const {
  addNote,
  findUserNotes,
  getDateAndTime,
} = require("../Services/NotesServices");

const createNote = {
  post: async (req, res) => {
    const { title, text } = req.body.note;
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
      note: {
        title: title,
        text: text,
        createdAt: getDateAndTime(),
        modifiedAt: "",
      },
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

const getUserNotes = {
  get: async (req, res) => {
    const username = req.user.username;

    if (username == null || username == undefined) {
      res.status(418).json({ message: "That username seems wrong!" });
      return;
    }

    try {
      const allNotes = await findUserNotes(username);
      // console.log("Found Notes", allNotes);
      res.status(200).json(allNotes);
    } catch (error) {
      res.status(500).json({ message: "Server went kaboom!" });
    }
  },
};
module.exports = { createNote, getUserNotes };
