require("../../mongoose/db");
const Order = require("../../mongoose/order");

export default async function handler(req,res){
  // const orders = await Order.find();
  res.status(200).json({
    orders
  })
}