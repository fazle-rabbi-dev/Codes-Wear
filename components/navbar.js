import { useState,useEffect,useRef } from 'react';
import { BsCartDash, BsFillBagCheckFill } from "react-icons/bs";
import {
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineClose
} from "react-icons/ai";
import { BiReset,BiWindowClose } from "react-icons/bi";
import { FaRegUser,FaRegWindowClose } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from 'next/router';


const Navbar = (props) => {
  const [optionMenu, setOptionMenu] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  const router = useRouter();
  const { 
    cart,addToCart,clearCart,
    removeFromCart,subTotal,
    key,user,logout
  } = props.cartFunction;

  // Show toast message
  const showToast = (msg) => toast.success(msg);

  const ref = useRef();
  const navBarRef = useRef();
  const toggleCart = () => {
    // alert(ref.current.classList)
    if (ref.current.classList.contains("left-[-230px]")) {
      ref.current.classList.remove("left-[-230px]");
      ref.current.classList.add("left-0");
    } else if (!ref.current.classList.contains("left-[-230px]")) {
      ref.current.classList.remove("left-0");
      ref.current.classList.add("left-[-230px]");
    }
  };

  const toggleNav = () => {
    if(navBarRef.current.classList.contains("hidden")){
      navBarRef.current.classList.remove('hidden');
      navBarRef.current.classList.add('flex');
    }else{
      navBarRef.current.classList.remove('flex');
      navBarRef.current.classList.add('hidden');
    }
  }

  // 
  const toggleUserOption = () => {
    setOptionMenu(!optionMenu);
  }
  

  useEffect(() => {
    if(!Object.keys(cart).length == 0){
      setDisabled(false);
    }
    else{
      setDisabled(true);
    }
  },[cart]);

  return (
    <div className="opacity-[0.98] bg-slate-100 sticky top-0 shadow shadow-md z-50">
      <header className="text-gray-600 body-font z-30">
        <div className="flex p-5 flex-row md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:flex">
          <Link
            href="/"
            legacyBehavior
            // className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            className=""
          >
            <img width="200px" className="ml-auto" src="/logo2.png" alt="Logo" />
          </Link>
          <nav className="hidden md:flex md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link legacyBehavior href="/">
              <a className="mr-5 hover:text-gray-900">Home</a>
            </Link>
            <Link legacyBehavior href="/about">
              <a className="mr-5 hover:text-gray-900">About</a>
            </Link>
            <Link legacyBehavior href="/contact">
              <a className="mr-5 hover:text-gray-900">Contact</a>
            </Link>
            <Link legacyBehavior href="/tshirts">
              <a className="mr-5 hover:text-gray-900">Tshirts</a>
            </Link>
            <Link legacyBehavior href="/hoodies">
              <a className="mr-5 hover:text-gray-900">Hoodies</a>
            </Link>
            <Link legacyBehavior href="/mugs">
              <a className="mr-5 hover:text-gray-900">Mugs</a>
            </Link>
            <Link legacyBehavior href="/stickers">
              <a className="mr-5 hover:text-gray-900">Stickers</a>
            </Link>
          </nav>
          </div>
          <div class="flex justify-center items-center">
            <button
              onClick={toggleCart}
              className="font-xl bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
            >
              <BsCartDash />
            </button>
            {
              !user.value && <Link href="/login"><button className="bg-pink-600 text-white px-2 py-1 rounded">
                Login
              </button></Link>
            }
            {
             user.value && <button
                className="font-xl bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
              >
                <FaRegUser onClick={toggleUserOption} />
              </button>
            }
            {optionMenu && <div class="border absolute top-16 p-4 text-sm rounded font-black font-bold right-4 bg-white shadow shadow-lg">
              <ul>
                <Link href="/myaccount" legacyBehavior><li onClick={()=>toggleUserOption()} class="mt-2 hover:text-gray-500">My Account</li></Link>
                <Link href="/orders" legacyBehavior><li onClick={()=>toggleUserOption()} class="mt-2 hover:text-gray-500">Orders</li></Link>
                <li onClick={()=>{
                  logout(),
                  showToast("Logout successful"),
                  toggleUserOption()
                }} class="mt-2 hover:text-gray-500">Logout</li>
              </ul>
            </div>}
          </div>
          
          {/*Navigation Menu For Small Screen*/}
          <RxHamburgerMenu className="md:hidden text-xl" onClick={toggleNav}/>
          <div ref={navBarRef} class="z-20 overflow-auto hidden md:hidden text-white flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-gray-100 h-full w-full">
              <div class="absolute top-7 right-5 text-xl">
                <FaRegWindowClose onClick={toggleNav} className="text-2xl text-black"/>
              </div>
              <ul className="space-y-4 text-center font-bold text-black">
                <Link href="/" legacyBehavior>
                  <li onClick={toggleNav} class="hover:text-pink-600">Home</li>
                </Link>
                <Link href="/about" legacyBehavior>
                  <li onClick={toggleNav} class="hover:text-pink-600">About</li>
                </Link>
                <Link href="/contact" legacyBehavior>
                  <li onClick={toggleNav} class="hover:text-pink-600">Contact</li>
                </Link>
                <Link href="/tshirts" legacyBehavior>
                  <li onClick={toggleNav} class="hover:text-pink-600">Tshirts</li>
                </Link>
                <Link href="/hoodies" legacyBehavior>
                  <li onClick={toggleNav} class="hover:text-pink-600">Hoodies</li>
                </Link>
                <Link href="/mugs" legacyBehavior>
                  <li onClick={toggleNav} class="hover:text-pink-600">Mugs</li>
                </Link>
                <Link href="/stickers" legacyBehavior>
                  <li onClick={toggleNav} class="hover:text-pink-600">Stickers</li>
                </Link>
              </ul>
          </div>
          
          {/*Cart Sidebar*/}
          <div
            ref={ref}
            class="p-3 cart-sidebar fixed overflow-auto bg-pink-100 transition-all top-0 left-[-230px] h-full w-[230px] z-50"
          >
            <ToastContainer
              autoClose={1000}
            />
            <span
              class="absolute top-3 right-3 text-2xl text-pink-500"
              onClick={toggleCart}
            >
              <AiFillCloseCircle />
            </span>
            <div class="mt-8">
              <h2 class="font-bold text-2xl text-black text-center">Shopping Cart</h2>
              {Object.keys(cart).length == 0 && (
                <p class="mt-3 text-sm font-bold text-gray-600 text-center">Cart is empty</p>
              )}
              {cart && Object.keys(cart).map((key) => {
                return (
                  <ol class="px-2 list-decimal mt-5">
                    <li class="flex items-start my-2 w-full">
                      <div class="w-[70%] break-words">
                        {/*<span>{cart[key].indexOf(item) + 1}. </span>*/}
                        <span>{cart[key].name}</span>
                      </div>
                      <div class="flex justify-around items-center text-center w-[30%]">
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
              <div class="mt-4 text-black font-bold">
                {subTotal > 0 && <span>Subtotal: ৳{subTotal}</span>}
              </div>
              {/*Buttons*/}
              <div class="mt-2">
                <Link href="/checkout" legacyBehavior>
                  <button 
                    disabled={disabled} 
                    onClick={toggleCart} 
                    className="disabled:bg-pink-400 flex w-full mx-auto text-white bg-pink-500 border-0 py-2 focus:outline-none hover:bg-pink-600 rounded text-sm flex justify-center items-center gap-2 w-[180px] my-2">
                    <BsFillBagCheckFill />
                    ৳{subTotal} Checkout
                  </button>
                </Link>
                <button
                  disabled={disabled}
                  onClick={() => {
                    clearCart(), showToast("Cart clear successful");
                  }}
                  className="disabled:bg-pink-400 w-full flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-sm flex justify-center items-center gap-2 w-[180px] my-2"
                >
                  <BiReset />
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
