require("../../mongoose/db");
const Order = require("../../mongoose/order");
const secretKey = process.env.SECRET_KEY
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  if(req.method == 'POST'){
    if(req.body.token){
      const token = req.body.token;
      try {
        // Let's decode the token
        var {email} = jwt.verify(token, secretKey);
        const orders = await Order.find({email});
        res.status(405).json({orders})
      } catch (e) {
        res.status(500).json({message:e.message})
      }
    }
    else{
      res.status(500).json({message:'Internal server error'})
    }
  }
  else{
    res.status(405).json({message:'Method not allowed'})
  }
}