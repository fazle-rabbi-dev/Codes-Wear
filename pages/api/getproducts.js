require("../../mongoose/db");
const Product = require("../../mongoose/product");

export default async function handler(req,res){
  if(req.method == 'GET'){
    try{
      const products = await Product.find();
      let newObj = {};
      for(let obj of products){
        // if statement only executes when new product comes with same name but diff variants !
        if(obj.title in newObj){
          if(!newObj[obj.title].color.includes(obj.color) && obj.availableQty > 0){
            newObj[obj.title].color.push(obj.color);
          }
          if(!newObj[obj.title].size.includes(obj.size) && obj.availableQty > 0){
            newObj[obj.title].size.push(obj.size);
          }
        }
        else{
          newObj[obj.title] = JSON.parse(JSON.stringify(obj));
          if(obj.availableQty > 0){
            newObj[obj.title].color = [obj.color];
            newObj[obj.title].size = [obj.size];
          }
        }
      }
      res.status(200).json({products:newObj});
    }
    catch(err){
      res.status(400).json({Message:"Failed to get products"});
    }
  }
  else{
    res.status(200).json({Message:"Method not allowed"});
  }
}
