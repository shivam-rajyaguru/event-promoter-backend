require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const influeRoute = require("./routes/influenceRoute");
const brandRoute = require("./routes/brandRoute");
const loginRegisterRoute = require("./routes/loginRegisterRoute");
const connectDB = require("./db/connectDB");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use("/api/v1/influence", influeRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1", loginRegisterRoute);

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
