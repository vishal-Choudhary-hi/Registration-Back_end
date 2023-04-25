const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const signUp = require("./routes/signup");
const sendOTP = require("./routes/sendOTP");
const verifyOTP = require("./routes/verifyOTP");
const login = require("./routes/login");

const app = express();
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: "GET,POST",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

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
