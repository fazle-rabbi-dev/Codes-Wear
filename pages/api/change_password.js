require("../../mongoose/db");
const User = require("../../mongoose/user");
const CryptoJS = require("crypto-js");
const secretKey = process.env.SECRET_KEY

export default async function handler(req,res){
  if(req.method == 'POST'){
    let { email,password,npassword } = req.body;
    // Encrypt
    npassword = CryptoJS.AES.encrypt(npassword, secretKey).toString();
    try {
      // Find user
      const user = await User.findOne({email});
      // Decrypt db password
      const bytes  = CryptoJS.AES.decrypt(user.password , secretKey);
      const plainPassword = bytes.toString(CryptoJS.enc.Utf8);
      // if old password currect
      if(password == plainPassword){
        await User.findOneAndUpdate({email},{
          password:npassword
        })
        res.status(200).json({
          success: true,
        })
        // console.log("Password changed to: "+npassword)
      }
      else{
        res.status(200).json({
          success: false,
        })
      }
    } catch (e) {
      console.log(e)
      res.status(500)
      .json({
        success:false,
        message: "Internal server error"
      })
    }
  }
}