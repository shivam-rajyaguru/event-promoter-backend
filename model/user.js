const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id must be unique"],
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  userType: {
    type: String,
    // default: "User",
  },
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
