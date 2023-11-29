require("../../mongoose/db");
const User = require("../../mongoose/user");

export default async function handler(req,res){
  const {name,email,phone,zipcode,address} = req.body;
  try {
    await User.findOneAndUpdate({email},{
      name,phone,zipcode,address
    });
    res.status(200).json({success:true});
  } catch (e) {
    console.log(e)
    res.status(200).json({success:false});
  }
}