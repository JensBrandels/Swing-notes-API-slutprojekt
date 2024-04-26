const userDB = require("../Models/UserModel");

const addUser = async (user) => {
  console.log("user", user); //just to check if i get the right user :'D
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
