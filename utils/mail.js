const nodemailer = require("nodemailer");

exports.generateOTP = (otpLength = 6) => {
  let OTP = "";
  for (let i = 0; i <= otpLength; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  return OTP;
};

exports.geenrateMailTransport = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "25dfa2def320d4",
      pass: "033b106f027e98",
    },
  });
