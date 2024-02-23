require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const influeRoute = require("./routes/influenceRoute");
const brandRoute = require("./routes/brandRoute");
const connectDB = require("./db/connectDB");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/influence", influeRoute);
app.use("/api/v1/branad", brandRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listining on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
