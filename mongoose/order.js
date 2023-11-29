const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  email: {type:String,required: true},
  orderId: {type:String,required: true},
  products: {type:Object,required:true},
  address: {type:String,required: true},
  amount: {type:Number,required: true},
  status: {type:String,required: true,default:"Pending"},
  deliveryStatus: {type:String,required: true,default:"Unshipped"},
  time: {type:Date,default:Date.now}
},{timeStamps:true});

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);