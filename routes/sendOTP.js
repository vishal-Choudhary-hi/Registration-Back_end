const bcrypt = require("bcrypt");

const emailOTP = require("../functions/emailOTP");
const OTPModel = require("../models/OTPModel");

const sendOTP = async (req, res) => {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const obj = {
      email: req.body.email,
      OTP: OTP,
    };
    const hashedOTP = await bcrypt.hash(OTP.toString(), 12);
    // console.log(hashedOTP);
    await OTPModel.updateOne(
      { email: req.body.email },
      { $set: { OTP: hashedOTP, date: new Date() } },
      { upsert: true }
    );
    await emailOTP(obj);
    res.status(201).send("OTP send");
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports = sendOTP;
