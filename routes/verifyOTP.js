const bcrypt = require("bcrypt");

const OTPModel = require("../models/OTPModel");

const verifyOTP = async (req, res) => {
  try {
    const obj = await OTPModel.findOne({ email: req.body.email }, { OTP: 1 });
    if (!obj) {
      throw "OTP is expired";
    }
    const match = await bcrypt.compare(req.body.OTP, obj.OTP);
    if (match == true) {
      await OTPModel.deleteOne({ email: req.body.email });
      res.status(201).send("OTP Matched");
    } else if (obj) {
      throw "OTP not matched";
    } else {
      throw "OTP is expired";
    }
  } catch (error) {
    res.status(201).send(error);
  }
};
module.exports = verifyOTP;
