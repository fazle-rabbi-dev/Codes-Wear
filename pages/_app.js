import "@/styles/globals.css";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {useRouter} from 'next/router';
import LoadingBar from 'react-top-loading-bar';
// import eruda from "eruda"

export default function App({ Component, pageProps, ...appProps }) {
  const isFullLayoutNeeded = ['/admin','/admin/dashboard','/admin/addproduct','/admin/viewproducts','/admin/orders'].includes(appProps.router.pathname);

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value:null});
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const router = useRouter();
  
  // authenticateUser
  const authenticateUser = async (token)=>{
    const res = await fetch(`${process.env.HOST}/api/login?token=${token}`);
    const response = await res.json();
    alert('inside authenticateUser')
    if(response.success){
      setUser({value:token});
      setKey(Math.random());
    }
    else{
      localStorage.removeItem('token');
    }
  };
  
  // Get Cartdata from localStorage and set it to state variable
  useEffect(() => {
    let cart_data = localStorage.getItem("cartData");
    const cartData = JSON.parse(cart_data);
    if (cartData) {
      // alert(JSON.stringify(cartData,null,4))
      setCart(cartData);
      saveCartData(cartData);
    }
    
    
    // Check users already logged in or not
    const token = localStorage.getItem('token');
    if(token){
      setUser({value:token});
      setKey(Math.random());
    }
    
    // Listen router change
    router.events.on('routeChangeStart', ()=>setProgress(40));
    router.events.on('routeChangeComplete', ()=>setProgress(100));

  }, [router.route]);

  // Save Cart Data In Localstorage
  const saveCartData = (cartData) => {
    if (cartData) {
      localStorage.setItem("cartData", JSON.stringify(cartData));
      console.log("cartData successfuly saved into localStorage");
      
      // Let's calculate total price
      // alert(JSON.stringify(cartData,null,4))
      let total = 0;
      for(let key in cartData){
        total += cartData[key].qty * cartData[key].price;
      }
      setSubTotal(total);
    } else {
      alert("cartData missing to pass in the saveCartData function");
    }
  };

  // Add Item In The Cart
  const addToCart = (itemcode, qty, price, name, size, variant,img) => {
    let newCartData = {...cart};
    // Check an item already exists or not in cart!
    if(itemcode in newCartData){
      newCartData[itemcode].qty += 1;
      setCart(newCartData);
      saveCartData(newCartData)
    }
    else{
      const cartObj = {
        itemcode,
        qty,
        price,
        name:`${name}(${variant}/${size})`,
        size,
        variant,
        img
      };
      newCartData[itemcode] = cartObj;
      setCart(newCartData);
      saveCartData(newCartData);
    }
  };

  // Remove from cart
  const removeFromCart = (itemcode,qty)=>{
    if(itemcode in cart){
      let newCartData = {...cart};
      newCartData[itemcode].qty = cart[itemcode].qty-1;
      if(newCartData[itemcode].qty == 0){
        delete newCartData[itemcode];
        setCart(newCartData)
        saveCartData(newCartData);
      }
      else{
        setCart(newCartData);
        saveCartData(newCartData);
      }
    }
    else{
      alert("not matched")
    }
  };
  
  
  // Clear Cart
  const clearCart = () => {
    setCart([]);
    saveCartData([]);
  };

  // Buy now
  const buyNow = (itemcode, qty, price, name, size, variant,img)=>{
    const emptyCart = {};
    const cartObj = {
        itemcode,
        qty,
        price,
        name:`${name}(${variant}/${size})`,
        size,
        variant,
        img
    };
    emptyCart[itemcode] = cartObj;
    setCart(emptyCart);
    saveCartData(emptyCart);
    router.push('/checkout');
  };

  // Logout User
  const logout = () => {
    localStorage.removeItem('token');
    setUser({value:null});
    setKey(100);
    router.push('/');
  };

  // Pack All Function Into An Object
  const cartFunction = {
    addToCart,
    cart,
    clearCart,
    removeFromCart,
    subTotal,
    buyNow,
    user,key,
    logout
  };
  
  
  
  return (
    <>
      <div id="console">
        
      </div>
    { 
      !isFullLayoutNeeded ? <div>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar cartFunction={cartFunction} />
        <div class="min-h-[100vh]">
          <Component cartFunction={cartFunction} {...pageProps} />
        </div>
        <Footer />
      </div>
      : 
      <div>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <div class="min-h-[100vh]">
          <Component cartFunction={cartFunction} {...pageProps} />
        </div>
      </div>
    }
    </>
  );
}



/*function MyApp({ Component, pageProps, ...appProps }: AppProps) {

    // use a LayoutComponent variable 
   // that switches to actual Layout or React.Fragment (no layout) 
   //accordingly to pathname


    const isLayoutNeeded = [`/dashboard`].includes(appProps.router.pathname);
    const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;

  
  return (<ApplicationWrapper> 
    <LayoutComponent>
        <Component />
    </LayoutCompnent>
    </ApplicationWrapper>);
}*/