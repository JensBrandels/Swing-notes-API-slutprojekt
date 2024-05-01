require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./Docs/Docs.json");
const app = express();

const users = require("./Routes/Users.js");
const notes = require("./Routes/Notes.js");

app.use(express.json());
app.use("/api/docs", swaggerUI.serve);
app.get("/api/docs", swaggerUI.setup(apiDocs));
app.use("/api", users);
app.use("/api", notes);

app.listen(process.env.PORT, process.env.BASE_URL, () => {
  console.log("Server is up and running!");
});
