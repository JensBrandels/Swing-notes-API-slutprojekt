require("dotenv").config();
const express = require("express");
const app = express();

const users = require("./Routes/Users.js");
const notes = require("./Routes/Notes");

app.use(express.json());
app.use("/api", users);
app.use("/api", notes);

app.listen(process.env.PORT, process.env.BASE_URL, () => {
  console.log("Server is up and running!");
});
