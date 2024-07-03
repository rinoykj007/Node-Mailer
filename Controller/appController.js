const nodemailer = require("nodemailer");
const { email, password } = require("../env.js");
const Mailgen = require("mailgen");

/** send a mail from test mail account */

const signup = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });

  let message = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "You should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

/** send a mail from real mail account */

const getBill = (req, res) => {
  const userEmail = "rinoykj007@gmail.com";

  let config = {
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  let response = {
    body: {
      name: "Daily Tuitions",
      outro: "This is send thrtough nodemailer by your name plus your email",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: email,
    to: userEmail,
    subject: "Assignment Nodejs",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "You should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  signup,
  getBill,
};
