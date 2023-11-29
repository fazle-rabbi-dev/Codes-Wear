import mongoose from "mongoose";
import Product from "../mongoose/product";
import { useEffect } from 'react';
import Link from 'next/link';
import OutOfStock from '../components/out_of_stock'

const Tshirts = ({products}) => {
  useEffect(() => {
    // alert(JSON.stringify(products,null,4))
  },[]);
  
  return(
    <div class="">
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4 justify-center gap-3 space-y-2">
            {Object.keys(products).length == 0 && <OutOfStock name="stickers"/>}
            {/*Hoodie Card Start Here*/}
            {
              Object.keys(products).map(keys => {
                return(
                  <div class="shadow shadow-2xl rounded rounded-lg  lg:w-1/4 md:w-[45%] p-4 w-[40%]">
                    <Link href={`/product/${products[keys].slug}`} class="block rounded overflow-hidden">
                      <img alt="ecommerce" class="w-full h-50 block" src={products[keys].img}/>
                    </Link>
                    <div class="mt-4">
                      <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">{products[keys].category}</h3>
                      <h2 class="text-gray-900 title-font text-lg font-medium">{products[keys].title.slice(0,30)}...</h2>
                      <p class="mt-1">৳ {products[keys].price}</p>
                    </div>
                    {/*color*/}
                    <div class="mt-2 flex space-x-2">
                      {
                        /*products[keys].color.map(cName => {
                          return <div key={cName} class={`h-5 w-5 rounded rounded-[50%] bg-${cName.toLowerCase()}-500`}></div>
                        })*/
                      }
                      
                      {products[keys].color.includes('red') && <div class="h-5 w-5 rounded rounded-[50%] bg-red-500"></div> }
                      {products[keys].color.includes('green') && <div class="h-5 w-5 rounded rounded-[50%] bg-green-500"></div> }
                      {products[keys].color.includes('blue') && <div class="h-5 w-5 rounded rounded-[50%] bg-blue-500"></div> }
                      {products[keys].color.includes('pink') && <div class="h-5 w-5 rounded rounded-[50%] bg-pink-500"></div> }
                      {products[keys].color.includes('yellow') && <div class="h-5 w-5 rounded rounded-[50%] bg-yellow-500"></div> }
                      {products[keys].color.includes('purple') && <div class="h-5 w-5 rounded rounded-[50%] bg-purple-500"></div> }
                      {products[keys].color.includes('black') && <div class="h-5 w-5 rounded rounded-[50%] bg-black"></div> }
                      
                    </div>
                    {/*size*/}
                    <div class="mt-2 flex justify-start items-center flex-wrap">
                      {
                        products[keys].size.map(sizeName => {
                          return <div class="border border-1 h-6 w-7 text-sm border-gray-200 text-center mt-1">{sizeName}</div>
                        })
                      }
                    </div>
                    
                  </div> 
                )
              })
            }
            {/*Card End Here*/}
          </div>
        </div>
      </section>      
    </div>    
    )
}

export default Tshirts


export async function getServerSideProps(context) {
  const URI=`${process.env.MONGO_URI}/mb-collection`;
  const connectionParams = { 
     useNewUrlParser: true, 
     useUnifiedTopology: true
  };
  
  let err = false;
  try {
    mongoose.connect(URI,connectionParams) 
  } catch (e) {
    err = true
  }
  
  
  // Let's get all products from db
  if(!err){
    const products = await Product.find({category:'sticker'});
    let newObj = {};
      for(let obj of products){
        // if statement only executes when new product comes with same name but diff variants !
        if(obj.title in newObj){
          if(!newObj[obj.title].color.includes(obj.color) && obj.availableQty > 0){
            newObj[obj.title].color.push(obj.color.toLowerCase());
          }
          if(!newObj[obj.title].size.includes(obj.size) && obj.availableQty > 0){
            newObj[obj.title].size.push(obj.size);
          }
        }
        else{
          newObj[obj.title] = JSON.parse(JSON.stringify(obj));
          if(obj.availableQty > 0){
            newObj[obj.title].color = [obj.color.toLowerCase()];
            newObj[obj.title].size = [obj.size];
          }
        }
      }
    return {
      props: {products:JSON.parse(JSON.stringify(newObj))}, // will be passed to the page component as props
    }
  }
}
