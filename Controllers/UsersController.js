const Datastore = require("nedb-promise");
const usersDB = new Datastore({
  filename: "../Databases/users.db",
  autoload: true,
});

module.exports = {
  post: (req, res) => {},
};
