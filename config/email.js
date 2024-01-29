const { config } = require("dotenv");
const nodemailer = require("nodemailer");
config();
const { MAILID, MAILPASSWORD } = process.env;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: MAILID,
    pass: MAILPASSWORD,
  },
});

module.exports = transporter;
