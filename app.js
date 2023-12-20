const path = require("path");

const express = require("express");
const csurf = require("csurf");
const expressSession = require("express-session");

const database = require("./database/database.js");
const authRoutes = require("./routes/auth-routes");

const createSessionConfig = require("./configs/session-config.js");

const csrfTokenMiddleware = require("./middlewares/csrf-token.js");
const errorHandlerMiddleware = require("./middlewares/error-handler.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

// check if post requests have csrf token or not
app.use(csurf());
app.use(csrfTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

database
  .connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
