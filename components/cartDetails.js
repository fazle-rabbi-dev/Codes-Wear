import {useState,useEffect} from 'react';
import Link from 'next/link';
import { BsCartDash, BsFillBagCheckFill } from "react-icons/bs";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function CartDetails(props){
  const { 
    cart,addToCart,clearCart,
    removeFromCart,subTotal
  } = props.data.cartFunction;
  const {handleSubmit} = props;
  
  const [disabled, setDisabled] = useState(true);
  
  // Show toast message
  const showToast = (msg) => toast.success(msg);
  
  useEffect(() => {
    if(Object.keys(cart).length == 0){
      setDisabled(true);
    }
    else{
      setDisabled(false);
    }
  },[cart]);
  
  return(
        <div
            class="rounded p-3 cart-sidebar overflow-auto bg-pink-100 transition-all top-0 left-[-230px] h-full z-10"
          >
            <div class="mt-8">
              {/*<h2 class="font-bold text-2xl text-black text-center">Shopping Cart</h2>*/}
              {cart.length == 0 && (
                <span class="mt-3 font-bold text-gray-600">Cart is empty</span>
              )}
              {cart && Object.keys(cart).map((key) => {
                return (
                  <ol class="px-2 list-decimal mt-5">
                    <li class="flex items-start my-2 w-full">
                      <div class="w-[70%] break-words">
                        {/*<span>{cart.indexOf(item) + 1}. </span>*/}
                        <span>{cart[key].name}</span>
                      </div>
                      <div class="flex justify-end space-x-2 items-center text-center w-[30%]">
                        <AiFillMinusCircle onClick={() => removeFromCart(cart[key].itemcode,cart[key].qty)} class="text-pink-500" />
                        <span class="text-black text-sm"> {cart[key].qty} </span>
                        <AiFillPlusCircle onClick={() => {
                          addToCart(
                            cart[key].itemcode,
                            1,
                            cart[key].price,
                            cart[key].name,
                            cart[key].size,
                            cart[key].variant
                          )}}
                          class="text-pink-500" />
                      </div>
                    </li>
                  </ol>
                );
              })}
              {/*Total Price*/}
              <div class="font-bold mt-4 text-black">
                <span>✅ Subtotal: ৳{subTotal}</span>
              </div>
              {/*Buttons*/}
              <div class="mt-2 flex justify-between items-center">
                {/*<Link href="/order" legacyBehavior>*/}
                  <button 
                    onClick={handleSubmit} 
                    disabled={disabled} 
                    className="disabled:bg-pink-400 flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm flex justify-center items-center gap-2 my-2">
                    <BsFillBagCheckFill />
                    ৳{subTotal} Pay Now
                  </button>
                {/*</Link>*/}
                <button
                  disabled={disabled} 
                  onClick={() => {
                    clearCart(), showToast("Cart clear successful");
                  }}
                  className="disabled:bg-pink-400 flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm flex justify-center items-center gap-2 my-2"
                >
                  <BiReset />
                  Clear
                </button>
              </div>
            </div>
          </div>
              
    );
}
