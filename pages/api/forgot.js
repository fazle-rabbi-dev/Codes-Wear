require("../../mongoose/db");
const User = require("../../mongoose/user");
const crypto = require('crypto');
const sendEmail = require("./send_email");

function generateResetToken() {
  // Generate a random buffer
  const buffer = crypto.randomBytes(32);
  // Convert the buffer to a hexadecimal string
  const token = buffer.toString('hex');
  return token;
}

export default async function handler(req,res){
  const { email } = req.body;
  if(email){
    // Check user exists or not
    try {
      const user = await User.findOne({email});
      // when user exists
      if(user){
        const token = generateResetToken();
        // save token in db
        await User.findOneAndUpdate({email},{token});
        // console.log(token)
        const resetLink = `http://localhost:3000/forgot?token=${token}`;
        const subject = "Codeswear - Password Reset";
        // send email
        const emailBody = `
          <html>
            <body>
              <h2>Dear ${user.name},</h2>
              <p>We have received a request to reset your password for your account on our website (codeswear).</p>
              <p>Please click on the following link to reset your password:</p>
              <a href="${resetLink}">${resetLink}</a>
              <p>If you did not request a password reset, please disregard this email.</p>
              <p>Best regards,</p>
              <p>The Codeswear Team</p>
            </body>
          </html>
        `;
        await sendEmail(email,subject,emailBody);
        res.status(200).json({
          success:true,
          message: "An email sent to your email address with instructions of reset your password"
        }) ;
      }
      else{
        res.status(500).json({
          success:false,
          message: "Sorry, we couldn't found such user with this email address!"
        }) ;
      }
    } catch (e) {
      res.status(500).json({
        success:false,
        message: "Something went wrong.Please provide a valid email address!"
      });
    }
  }
  else{
    res.status(500).json({
      success:false,
      message: "Please provide your email address!"
    }) ;
  }
}
