const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const signUp = require("./routes/signup");
const sendOTP = require("./routes/sendOTP");
const verifyOTP = require("./routes/verifyOTP");
const login = require("./routes/login");

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true"); // add this line
  next();
});

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("Connection Successfull"));
const PORT = process.env.PORT || 3000;

app.post("/signup", signUp);
app.post("/sendOTP", sendOTP);
app.post("/verifyOTP", verifyOTP);
app.post("/login", login);
app.listen(PORT, () => {
  console.log(`Server Listing on port ${PORT}`);
});
