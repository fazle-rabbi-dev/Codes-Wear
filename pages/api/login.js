require("../../mongoose/db");
const User = require("../../mongoose/user");
const CryptoJS = require("crypto-js");
const secretKey = process.env.SECRET_KEY
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  if(req.method == 'GET'){
    const {token} = req.query;
    // when token found in query parameter
    if(token){
      try {
        // when token valid
        var decoded = jwt.verify(token, secretKey);
        // console.log(decoded);
        res.status(200).json({success:true});
      } catch (e) {
        // when token invalid
        res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
    }
    // when token not found in query parameter
    else{
      res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
  }
  else if(req.method == 'POST'){
    try {
      const {name,email,password} = req.body;
      const user = await User.findOne({email});
      // when user exists
      if(user){
        // Let's Decrypt Encrypted Password
        const bytes  = CryptoJS.AES.decrypt(user.password , secretKey);
        const plainPassword = bytes.toString(CryptoJS.enc.Utf8);
        // when password matched
        if(plainPassword == password){
          // Let's Generate Jwt
          const token = jwt.sign({ 
              message: "Login successful",
              name,email
            }, secretKey);
          res.status(200).json({
              success: true,
              token
          });
        }
        else{
          res.status(401).json({
            success: false,
            message: "Invalid credentials"
          });
        }
      }
      // when user not found
      else{
        res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
  else{
    res.status(405)
    .json({message:"Method not allowed"});
  }
}
