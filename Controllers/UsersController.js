const { addUser, checkUser } = require("../Services/UserServices");
const { hashPassword, comparePassword } = require("../bcrypt");
const jwt = require("jsonwebtoken");

const createUser = {
  post: async (req, res) => {
    const { username, password, email } = req.body;

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

      //HASH the password
      const encryptedPassword = await hashPassword(password);

      const user = {
        username: username,
        password: encryptedPassword,
        email: email,
      };

      await addUser(user);
      res.status(200).json({ message: "User has been successfully created!" });
    } catch (error) {
      res.status(500);
    }
  },
};

const loginUser = {
  post: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await checkUser(username);
      // console.log(user);
      if (user == null) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const comparedPassword = await comparePassword(password, user.password);
      if (comparedPassword) {
        const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );

        let result = {
          token: token,
        };
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Password is wrong!" });
        return;
      }
    } catch (error) {
      res.status(500);
    }
  },
};

module.exports = { createUser, loginUser };
