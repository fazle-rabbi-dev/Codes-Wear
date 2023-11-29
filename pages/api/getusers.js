require("../../mongoose/db");
const User = require("../../mongoose/user");

export default async function handler(req,res){
  // const allUsers = await User.find();
  res.json({allUsers:null});
}
