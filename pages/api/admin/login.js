const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const secretKey = process.env.SECRET_KEY
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  const { username,password } = req.body;
  if(username == ADMIN_USER && password == ADMIN_PASS){
    // console.log("Logged in successful");
    // generate jwt token 
    const token = jwt.sign({ 
      message: "Login successful",
      username
    }, secretKey);
    // send token
    res.status(200).json({
      success: true,
      message: "Logged in successful",
      adminToken:token
    });
  }
  else{
    res.status(200).json({
      success: false,
      message: "Invalid credentials!"
    });
  }
}