require("../../mongoose/db");
const Order = require("../../mongoose/order");
const Product = require("../../mongoose/product");
const { v4: uuidv4 } = require('uuid');

export default async function handler(req, res) {
  const orderId = uuidv4();
  const {
    email,address,
    status,amount,
    products
  } = req.body;
  const order = new Order({
    orderId,
    email,
    address,
    status,
    amount,
    products
  });
  // when cart is empty
  if(Object.keys(products).length == 0){
    res.status(406).json({
      success:false,
      message: "Your cart is empty please add some product in your cart and try to pay!"
    });
  }
  // when cart is not empty
  else{
    // Check cart is tampared or not !
    let actualPrice = 0;
    let customerPrice = 0;
    for(let slug in products){
      let product = await Product.findOne({slug});
      actualPrice += product.price * products[slug].qty;
      customerPrice += products[slug].price * products[slug].qty;
    }
    // Cart is not tempared
    if(actualPrice == customerPrice){
      // Check product out of stock or not
      for(let slug in products){
        let product = await Product.findOne({slug});
        if(products[slug].qty > product.availableQty){
          res.status(406).json({
            success:false,
            message: "Sorry, some product in your cart are out of stock!"
          });
          return;
        }
      }
      // When everything is fine let's complete order
      // and update availableQty in database
      await order.save();
      for(let slug in products){
        // Update availableQty
        let product = await Product.findOne({slug});
        await Product.findOneAndUpdate({slug},{"availableQty": (product.availableQty - products[slug].qty)});
      }
      res.status(200).json({id:order._id});
    }
    // Cart is tempared
    else{
      res.status(406).json({
        success:false,
        message: "Some price of items in your cart has been changed.Please rebuild your cart and try again!"
      });
    }
  }
}
