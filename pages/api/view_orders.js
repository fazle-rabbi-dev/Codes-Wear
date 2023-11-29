require("../../mongoose/db");
const Order = require("../../mongoose/order");

export default async function handler(req,res){
  const data = await Order.find();
  res.json({data})
}