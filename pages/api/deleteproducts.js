require("../../mongoose/db");
const Product = require("../../mongoose/product");

export default async function handler(req,res){
  if(req.method == 'POST'){
    try{
      for(let i=0;i<req.body.length;i++){
        await Product.findByIdAndRemove({_id:req.body[i].id});
      }
      res.status(200).json({Message:"Products deleted successful"});
    }
    catch(err){
      res.status(400).json({Message:"Failed to delete products"});
      console.log(err);
    }
  }
  else{
    res.status(200).json({Message:"Method not allowed"});
  }
}
