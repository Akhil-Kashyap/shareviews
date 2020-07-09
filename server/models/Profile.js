const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  handle: {
    type: String,
    type: String,
    max: 15,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
