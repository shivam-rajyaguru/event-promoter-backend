const mongoose = require("mongoose");

const connectDB = (uri) => {
  return mongoose
    .connect(uri)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDB;
