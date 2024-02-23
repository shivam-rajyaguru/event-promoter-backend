const mongoose = require("mongoose");

const brnadSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
  },
  brandCategory: {
    type: String,
    required: true,
  },
  brandDescription: {
    type: String,
    required: true,
  },
});

const Brand = new mongoose.model("brand", brnadSchema);
module.exports = Brand;
