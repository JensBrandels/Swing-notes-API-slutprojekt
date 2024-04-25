const { addUser, checkUser } = require("../Services/UserServices");

module.exports = {
  post: async (req, res) => {
    const { username, password, email } = req.body;

    const user = {
      username: username,
      password: password,
      email: email,
    };

    try {
      const foundUser = await checkUser(username);
      if (foundUser) {
        res.status(409).json({ message: "Username already exists!" });
        return;
      }

      if (username === "" || password === "" || email === "") {
        res
          .status(406)
          .json({ message: "username, password and email must be filled in!" });
        return;
      }

      await addUser(user);
      res
        .status(200)
        .json({ message: "User has been successfully created!", user: user });
    } catch (error) {
      res.status(500);
    }
  },
};
