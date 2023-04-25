const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SignupModel = require("../models/SignupModel");

const signUp = async (req, res) => {
  try {
    if (req.body.optVerified == 1) {
      const user = await SignupModel.findOne({
        $or: [
          { emailId: req.body.emailId },
          { phoneNumber: req.body.phoneNumber },
        ],
      });
      if (user) {
        throw "User with same email ID or phone number already exists.";
      }
      let hashedPassword = await bcrypt.hash(req.body.password, 12);
      req.body.password = hashedPassword;
      const signup = new SignupModel(req.body);
      await signup.save();
      const token = jwt.sign(
        { id: signup._id.toString() },
        process.env.JWT_SECRET_KEY
      );
      await SignupModel.findByIdAndUpdate(signup._id, { token: token });
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      res.cookie("jwt", token, { httpOnly: true, expires: expirationDate });

      res.status(201).send("Success");
    } else {
      throw "not verified otp";
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = signUp;
