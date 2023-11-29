require("../../mongoose/db");
const User = require("../../mongoose/user");
const CryptoJS = require("crypto-js");
const secretKey = process.env.SECRET_KEY

export default async function handler(req,res){
  if(req.method == 'POST'){
    try {
      let { name,email,password } = req.body;
      const isExistsUser = await User.findOne({email});
      // When email not registered
      if(!isExistsUser){
        // Encrypt
        password = CryptoJS.AES.encrypt(password, secretKey).toString();
        // console.log(name,email,password)
        const user = new User({name,email,password});
        await user.save();
        res.status(200).json({
          success: true,
          message: "Account created successful"
        });
      }
      // When email already registered
      else{
        // console.log("Resgistered")
        res.status(409).json({
          success: false,
          message: "This email address already registered.Please choose another email address."
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Account creation failed"
      });
    }
    
  }
  else{
    res.status(400)
    .json({message:"Method not allowed"});
  }
}
