const mongoose = require("mongoose");

const brnadSchema = new mongoose.Schema({
  brandName: {
    type: String,
    // required: true,
  },
  brandCategory: {
    type: String,
    // required: true,
  },
  brandDescription: {
    type: String,
    // required: true,
  },
  brndWebsite: {
    type: String,
  },
  brandContact: {
    type: Number,
    // required: true,
  },
  brandEmail: {
    type: String,
    // required: true,
  },
  brandAddress: {
    type: String,
  },
  brandCity: {
    type: String,
  },
  brandState: {
    type: String,
  },
  brandZip: {
    type: Number,
  },
  brandSocialFacebook: {
    type: String,
  },
  brnadSocialInsta: {
    type: String,
  },
  brandSocialTweet: {
    type: String,
  },
  brandImage: {
    type: String,
    // required: true,
  },
  brandLogo: {
    type: String,
    // required: true,
  },
});

const Brand = new mongoose.model("brand", brnadSchema);
module.exports = Brand;
