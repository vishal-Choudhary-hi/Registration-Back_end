const bcrypt = require("bcrypt");

const SignupModel = require("../models/SignupModel");

const login = async (req, res) => {
  try {
    const user = await SignupModel.findOne({ emailId: req.body.emailId });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        res.status(201).send("Auth successfull");
      } else {
        throw "password not matched";
      }
    } else {
      throw "User not registered";
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = login;
