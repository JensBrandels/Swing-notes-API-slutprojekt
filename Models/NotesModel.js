const Datastore = require("nedb-promise");

const notesDB = new Datastore({
  filename: "./Databases/notes.db",
  autoload: true,
});

module.exports = { notesDB };
