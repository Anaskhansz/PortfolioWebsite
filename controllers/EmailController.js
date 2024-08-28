require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
});

const email = (req, res) => {
  const { from, subject, message } = req.body;

  if (!from || !subject || !message) {
    return res.status(400).json({ message: "Invalid request", success: false });
  }

  const mailOptions = {
    from,
    to: process.env.EMAIL_USER,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
        <h2 style="margin-top: 0;">Message from ${from}</h2>
        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Failed to send email", success: false });
    }
    return res
      .status(200)
      .json({ message: "Email sent successfully", success: true });
  });
};

module.exports = email;
