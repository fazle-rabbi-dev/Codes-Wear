import mongoose from "mongoose";
import ProductModel from "../../mongoose/product";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from 'next/error';

const Product = (props) => {
  // Show toast message
  const showToast = (msg) => toast.success(msg);
  const router = useRouter();
  const { slug } = router.query;
  
  const [product, setProduct] = useState(props.product)
  const [variants, setVariants] = useState(props.variants)
  
  // const {product,variants} = props;
  const { addToCart,buyNow } = props.cartFunction;
  
  // State Variables
  const [pinCode, setPincode] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const checkPincode = async () => {
    const url = `${process.env.NEXT_PUBLIC_HOST}/api/pincode`;
    const res = await fetch(url);
    const pinJson = await res.json();
    if (Object.keys(pinJson).includes(pinCode)) {
      toast.success("This zip code is serviceable")
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
      toast.error("Sorry, this zip code is not serviceable!")
    }
  };
  
  
  // 
  // const [color, setColor] = useState(props.product.color);
  // const [size, setSize] = useState(props.product.size);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  
  const refreshVariant = (newColor,newSize)=>{
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize].slug}`;
    // window.location = url;
    router.push(url);
  };
  
  useEffect(() => {
    // alert(JSON.stringify(props.product,null,3))
    if(props.error == 0){
      // alert('ok')
      setProduct(props.product);
      setVariants(props.variants);
      setColor(props.product.color);
      setSize(props.product.size);
    }
    
  },[props]);
  
  if(props.error == 404){
    return <Error statusCode={404}/>
  }
  
  return (
    <div>
      <ToastContainer autoClose={1000}/>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              class="mx-auto h-60 md:w-1/2 md:h-auto rounded"
              src={product.img}
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                Codes Wear
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span class="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p class="capitalize leading-relaxed">
                { product.desc }
              </p>
              
              {/*Display Available Color*/}
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div class="flex">
                  <span class="mr-3">Color</span>
                  {
                    Object.keys(variants).map(colorName => {
                      return(
                        colorName && Object.keys(variants[colorName]).includes(size) && <button onClick={() => refreshVariant(colorName,size)} class={`bg-${colorName.toLowerCase()}-500 ${colorName==color && 'border-2 border-gray-600'} rounded-full w-6 h-6 focus:outline-none mx-1`}></button>
                      )
                    })
                  }
                </div>
                
                {/*Display Available Size*/}
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative z-0">
                    {/*JSON.stringify(variants)*/}
                    <select value={size} onChange={(e)=> refreshVariant(color,e.target.value)} class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {
                        color && Object.keys(variants[color]).map(size => {
                          return <option value={size}>{ size }</option>
                        })
                      }
                    </select>
                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap justify-between items-center">
                {
                  product.availableQty == 0 ? 
                  <span class="title-font font-medium text-2xl text-gray-900">
                    Out of Stock!
                  </span>
                  : <span class="title-font font-medium text-2xl text-gray-900">
                    ৳{ product.price }
                  </span>
                }
                <div class="flex flex-wrap items-center justify-center space-x-2">
                  <button
                    disabled={product.availableQty == 0}
                    onClick={() => {
                      showToast("Item successfully added to cart");
                      addToCart(
                        product.slug,
                        1,
                        product.price,
                        product.title,
                        product.size,
                        product.color,
                        product.img,
                      );
                      // alert(product.color)
                    }}
                    class="disabled:bg-pink-400 flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                  >
                    Add To Cart
                  </button>
                  <button
                      disabled={product.availableQty == 0}
                      onClick={()=>{
                        buyNow(
                          product.slug,
                          1,
                          product.price,
                          product.title,
                          product.size,
                          product.color,
                          product.img,
                        )
                      }}
                      class="disabled:bg-pink-400 flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                    >
                      Buy Now
                    </button>
                </div>
                {/*<button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>*/}
              </div>
              <div class="mt-4 flex items-center">
                <input
                  placeholder="Enter zip code"
                  onChange={(e) => setPincode(e.target.value)}
                  class="px-2 rounded w-40 h-10 border border-2 border-gray-200 focus:outline-none"
                  type="number"
                  name=""
                  id=""
                  value={pinCode}
                />
                <button
                  onClick={checkPincode}
                  class="md:ml-5 flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Check
                </button>
              </div>
              {!isAvailable && isAvailable != null && (
                <div class="text-red-500 mt-4">
                  <span>Sorry, this zip code is not serviceable</span>
                </div>
              )}

              {isAvailable && (
                <div class="text-green-500 mt-4">
                  <span>Yaaa! this zip code is serviceable</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;



export async function getServerSideProps(context) {
  const URI=`${process.env.MONGO_URI}/mb-collection`;

  const connectionParams = { 
     useNewUrlParser: true, 
     useUnifiedTopology: true
  };
  const { slug } = context.query;

  let err = false;
  try {
    mongoose.connect(URI,connectionParams) 
  } catch (e) {
    err = true
  }
  
  
  // Let's get all products from db
  if(!err){
    // Get clicked product
    let error = null;
    let product = await ProductModel.findOne({slug});
    product = JSON.parse(JSON.stringify(product));
    if(product == null){
      error = 404;
      return {
        props: {error}// will be passed to the page component as props
      }
    }
    /*
      Get all products that matched 
      to the title of the clicked product
    */
    // variants are all products
    let variants = await ProductModel.find({title:product.title,category:product.category});
    variants = JSON.parse(JSON.stringify(variants));
    let colorSizeSlug = {}; // {red:{sm:{slug:"something ..."}}}
    colorSizeSlug = JSON.parse(JSON.stringify(colorSizeSlug));
    for(let obj of variants){
      if(Object.keys(colorSizeSlug).includes(obj.color)){
        colorSizeSlug[obj.color][obj.size] = {slug:obj.slug};
      }
      else{
        colorSizeSlug[obj.color] = {}
        colorSizeSlug[obj.color][obj.size] = {slug:obj.slug};
      }
    }
    
    return {
      props: {error:0,variants:colorSizeSlug,product}// will be passed to the page component as props
    }
  }
}
