const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/post");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//use Route
app.use("/users", users);
app.use("/profile", profile);
app.use("/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));
