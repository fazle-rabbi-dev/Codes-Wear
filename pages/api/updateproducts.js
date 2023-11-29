require("../../mongoose/db");
const Product = require("../../mongoose/product");

export default async function handler(req,res){
  if(req.method == 'POST'){
    try{
      for(let i=0;i<req.body.length;i++){
        let product = {
          title:req.body[i].title,
          slug:req.body[i].slug,
          desc:req.body[i].desc,
          img:req.body[i].img,
          category:req.body[i].category,
          size:req.body[i].size,
          color:req.body[i].color,
          price:req.body[i].price,
          availableQty:req.body[i].availableQty
        };
        await Product.findByIdAndUpdate({_id:req.body[i].id},{...product});
      }
      res.status(200).json({Message:"Products updated successful"});
    }
    catch(err){
      res.status(400).json({Message:"Failed to update products"});
      console.log(err)
    }
  }
  else{
    res.status(200).json({Message:"Method not allowed"});
  }
}
