require("../../mongoose/db");
const User = require("../../mongoose/user");

export default async function handler(req,res){
  const {email} = req.body;
  let user = await User.findOne({email});
  // console.log(user)
  res.status(200).json({
    user
  });
}