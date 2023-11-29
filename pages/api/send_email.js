const nodemailer = require('nodemailer');
const USER = process.env.EMAIL_USER;
const PASS = process.env.EMAIL_PASS;

async function sendEmail(to, subject, body) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `${USER}@gmail.com`, // your email
      pass: PASS // your email password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${USER}@gmail.com`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    html: `${body}` // html body
  });
  console.log('Message sent: %s', info.messageId);
}

module.exports = sendEmail;