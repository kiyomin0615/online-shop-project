const path = require("path");

const express = require("express");

const database = require("./database/database.js");
const authRoutes = require("./routes/auth-routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(authRoutes);

database
  .connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
