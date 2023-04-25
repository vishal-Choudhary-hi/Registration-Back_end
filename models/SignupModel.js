const { default: mongoose } = require("mongoose");

const SignupSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  optVerified: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});
const SignupModel = mongoose.model("SignupModel", SignupSchema);
module.exports = SignupModel;
