const mongoose = require("mongoose");

const influenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    required: true,
    default: "India",
  },
  totalsubmission: {
    type: Number,
    required: true,
  },
  lastsubmission: {
    type: Date,
  },
});

const Influence = new mongoose.model("influence", influenceSchema);
module.exports = Influence;
