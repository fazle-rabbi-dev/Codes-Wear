require("../../mongoose/db");
const Order = require("../../mongoose/order");

export default async function handler(req, res) {
  const { id } = req.query;
  if(id){
    try {
      const order = await Order.findOne({_id:id});
      res.status(200).json({success:true,order});
    } catch (e) {
      res.status(500).json({success:false,message:"Internal server error"});
    }
  }
  else{
    /*try {
      const orders = await Order.find();
      res.status(200).json({orders});
    } catch (e) {*/
      res.status(500).json({success:false,message:"Internal server error"});
    // }
  }
}
