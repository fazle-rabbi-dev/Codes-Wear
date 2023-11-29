require("../../mongoose/db");
const User = require("../../mongoose/user");
const CryptoJS = require("crypto-js");
const secretKey = process.env.SECRET_KEY

// password = CryptoJS.AES.encrypt(password, secretKey).toString();

export default async function handler(req,res){
  const {token,npassword} = req.body;
  if(token){
    const user = await User.findOne({token});
    if(user){
      const password = CryptoJS.AES.encrypt(npassword, secretKey).toString();
      await User.findOneAndUpdate({token},{password});
      res.status(200).json({
        success: true,
        message: "Password resete successful"
      });
    }
    else{
      res.status(500).json({
        success: false,
        message: "Oops! Something went wrong!"
      });
    }
    return;
  }
  res.status(500).json({
    success: false,
    message: "Password resete failed"
  })
}