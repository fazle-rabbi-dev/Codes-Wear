const secretKey = process.env.SECRET_KEY
var jwt = require('jsonwebtoken');

export default async function handler(req,res){
  if(req.body.token){
    const token = req.body.token;
    try {
      var decoded = jwt.verify(token, secretKey);
      if(req.body.email){
        res.status(200).json({
          success:true,
          email: decoded.email
        })
      }
    } catch (e) {
      console.log(e.message)
      res.send('error')
    }
  }
}