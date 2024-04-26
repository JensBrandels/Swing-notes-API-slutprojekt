const { addNote } = require("../Services/NotesServices");

const createNote = {
  post: async (req, res) => {
    const { title, text } = req.body.note;
    const username = req.user.username; //getting the username from the request from my middleware authentication

    const createdNote = {
      user: username,
      note: {
        title: title,
        text: text,
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
module.exports = { createNote };
