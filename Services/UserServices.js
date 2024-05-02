const userDB = require("../Models/UserModel");

const addUser = async (user) => {
  try {
    await userDB.insert(user);
  } catch (error) {
    console.log(error);
  }
};

const checkUser = async (username) => {
  return await userDB.findOne({ username: username });
};

module.exports = { addUser, checkUser };
