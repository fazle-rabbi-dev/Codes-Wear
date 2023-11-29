import { useState,useEffect } from 'react';
import CartDetails from '../components/cartDetails';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Checkout = (props) => {
  const { 
    cart,addToCart,clearCart,
    removeFromCart,subTotal
  } = props.cartFunction;
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState(false);
  const router = useRouter();
  
  const handleChange = async(e) => {
    let value = e.target.value;
    switch (e.target.name) {
      case 'name':
        setName(value);
        break;
      
      case 'email':
        // alert(value)
        setEmail(value);
        break;
      
      case 'phone':
        if(value.length > 11){
          
        }else{
          setPhone(value);
        }
        break;
      
      case 'zipcode':
        if(value.length > 4){
          value = value.slice(0,value.length-1)
        }
        else{
          setZipCode(value);
        }
        // Auto fill district and state with corresponding zipCode
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const zipJson = await res.json();
        if(Object.keys(zipJson).includes(value)){
          setDistrict(zipJson[value][0]);
          setState(zipJson[value][1]);
        }
        else{
          setDistrict('');
          setState('');
        }
        break;
      
      case 'address':
        setAddress(value);
        break;
      
      default:
        // code
    }
    /*if(name.length>3 && email.length>6 && phone.length==11 && address.length>5 && zipCode.length==4 && district.length>3 && state.length>3){
      setDisabled(false);
    }
    if(name=='' || email=='' || phone=='' || address=='' || zipCode=='' || district == '' || state == ''){
      // alert('fired')
      //setDisabled(true);
    }*/
  };
  
  const handleSubmit = async () => {
    if(name.length<4){
      toast.error("Enter your currect name!");
      //setDisabled(true);
      return;
    }
    if(email.length<10 || !email.includes('@')){
      toast.error("Invalid email address!");
      //setDisabled(true);
      return;
    }
    if(phone.length!=11 || !phone.startsWith('01')){
      toast.error("Enter your 11 digit currect phone number!");
      //setDisabled(true);
      return;
    }
    if(zipCode.length!=4 || district.length<5){
      toast.error("Enter a valid zip code!");
      //setDisabled(true);
      return;
    }
    if(address.length<10 || !address.includes(',')){
      toast.error("Please provide your currect address!");
      //setDisabled(true);
      return;
    }
    // alert("Ready to submit")
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkout`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        address,
        status:'Paid',
        amount: subTotal,
        products: cart
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const response = await res.json();
    if(!response.success){
      toast.error(response.message);
      // When cart is tempared clear the cart
      // clearCart();
    }
    if(response.id){
      // alert("ok")
      // alert(JSON.stringify(response,null,2))
      router.push(`/order/?id=${response.id}`);
      // After order confirm/payment complete clear the cart
      setTimeout(function() {
        clearCart();
      }, 1000);
    }
  };
  
  useEffect(() => {
    
    async function getEmail(token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_token_data`, {
          method: 'POST',
          body: JSON.stringify({
            email: true,
            token
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
        if(response.email){
          setEmail(response.email);
        }
    }
    
    if(localStorage.getItem("token")){
      getEmail(localStorage.getItem("token"));
      setToken(true);
    }
    else{
      setToken(false);
    }
    // Get user by email 
    const getUser = async(email) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_user`, {
          method: 'POST',
          body: JSON.stringify({
            email
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const {user} = await res.json();
        // Autofil form data
        // alert(JSON.stringify(user,null,2))
        setName(user.name);
        setPhone(user.phone);
        setZipCode(user.zipcode);
        setAddress(user.address);
        // Auto fill district and state with corresponding zipCode
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        const zipJson = await res2.json();
        if(Object.keys(zipJson).includes(user.zipcode)){
          setDistrict(zipJson[user.zipcode][0]);
          setState(zipJson[user.zipcode][1]);
        }
      } catch (e) {
        alert(e.message)
        // toast.error("Network error");
      }
    }
    
    if(token && email){
      getUser(email);
    }
    
  }, [email]);
  
  
  
  return (
    <div className="my-4 mx-3 md:mx-10">
      <ToastContainer
        autoClose={2000}
      />
      <h2 className="font-bold text-center text-3xl">Checkout</h2>
      {
       true ? <div class="mt-2 px-2">
        <p className="font-medium text-md">1. Delivery Details</p>
        <form class="" action="" method="get" accept-charset="utf-8">
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">Name</label>
            <input placeholder="john doe" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="text" name="name" id="name" value={name} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">Email</label>
            <input disabled={token} placeholder="john@gmail.com" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="text" name="email" id="name" value={email} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">Phone</label>
            <input placeholder="017xxxxxxxx" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="number" name="phone" id="name" value={phone} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">District</label>
            <input disabled onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="text" name="district" id="" value={district} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">State</label>
            <input disabled onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="text" name="state" id="" value={state} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">Zipcode</label>
            <input placeholder="2200" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="number" name="zipcode" id="" value={zipCode} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">Address</label>
            <textarea placeholder="Village,Post office,Upazilla" onChange={handleChange} className="resize-none h-20 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" name="address" id="" rows="8" cols="40" value={address} ></textarea>
          </div>
        </form>
        {/*Review Cart Item & Pay*/}
        <div class="mt-5">
          <p className="mb-3 font-medium text-md">2. Review Cart Item & Pay</p>
          <CartDetails handleSubmit={handleSubmit} disabled={disabled} data={props} />
        </div>
      </div>
      : <img class="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
        }
    </div>
  )
}

export default Checkout