const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILID,
    pass: process.env.MAIL_PASSWORD,
  },
});
const emailOTP = async (data) => {
  const mailOptions = {
    from: process.env.MAILID,
    to: data.email,
    subject: "Email Verification",
    text: `Hello , Your email ID was used to register for the our site.
        Please use the verification code/OTP below to verify your Email ID.
        Verification Code/OTP: ${data.OTP}`,
  };
  let flag;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error != null) {
      console.log("Email sending error", error);
      flag = false;
    } else {
      flag = true;
    }
  });
  return flag;
};
module.exports = emailOTP;
