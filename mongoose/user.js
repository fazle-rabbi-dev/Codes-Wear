const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {type:String,required:true},
  email: {type:String,required:true},
  password: {type:String,required:true},
  phone: {type:String,default:''},
  zipcode: {type:String,default:''},
  address: {type:String,default:''},
  token: {type:String,default:''}
},{timeStamps:true});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);