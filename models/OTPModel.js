const mongoose = require("mongoose");
const OTPSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  OTP: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
});
OTPSchema.index({ date: 1 }, { expireAfterSeconds: 3600 });
const OTPModel = mongoose.model("OTPModel", OTPSchema);
module.exports = OTPModel;
