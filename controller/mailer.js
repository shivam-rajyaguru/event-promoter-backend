require("dotenv").config();
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const registeredMail = async (req, res) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js",
    },
  });

  const { username, userEmail, text, subject } = req.body;

  var email = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: subject || "Sign up successfull",
    html: emailBody,
  };

  //send mail

  transporter
    .sendMail(message)
    .then(() =>
      res.status(201).json({ msg: "You should receive a email from us" })
    )
    .catch((error) => res.status(501).json({ error }));
};

module.exports = registeredMail;
