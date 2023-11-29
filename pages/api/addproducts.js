require("../../mongoose/db");
const Product = require("../../mongoose/product");

export default async function handler(req,res){
  if(req.method == 'POST'){
    try{
      for(let i=0;i<req.body.length;i++){
        const product = new Product({
          title:req.body[i].title,
          slug:req.body[i].slug,
          desc:req.body[i].desc,
          img:req.body[i].img,
          category:req.body[i].category,
          size:req.body[i].size,
          color:req.body[i].color,
          price:req.body[i].price,
          availableQty:req.body[i].availableQty
        });
        await product.save(product);
      }
      res.status(200).json({success:true,Message:"Products added successful"});
    }
    catch(err){
      res.status(400).json({success:false,Message:"Failed to add products"});
      console.log(err)
    }
  }
  else{
    res.status(405).json({success:false,Message:"Method not allowed"});
  }
}
