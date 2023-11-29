import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';


const Payment = (props) => {
  const { 
    subTotal
  } = props.cartFunction;
  const [cardNum, setCardNum] = useState('');
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(cardNum.length < 9 || cardNum.length > 9){
      toast.error("Card number must be 9 digit");
    }
    else{
      toast.success("Payment successful");
      router.push('/order');
    }
  };
  
  return (
    <div>
      <ToastContainer
        autoClose={1000}
      />
      <h2 class="mt-3 text-center text-2xl font-semibold">Payment</h2>
      <p class="text-center text-sm text-gray-500">This is a fake payment ui just for testing </p>
      <form onSubmit={handleSubmit} class="mx-3 md:mx-5 p-3" accept-charset="utf-8">
        <div class="">
          <label class="" for="">Total Amount</label>
          <input disabled class="mt-1 h-10 outline-0 pl-1 w-full border border-1 rounded border-b-gray-200 shadow shadow-sm" placeholder="" type="text" name="" id="" value={subTotal} />
        </div>
        <div class="mt-3">
          <label class="" for="">Card Number</label>
          <input onChange={(e)=>setCardNum(e.target.value)} placeholder="782519179" class="mt-1 h-10 placeholder-gray-400 outline-0 pl-1 w-full border border-1 rounded border-gray-200 shadow shadow-sm focus:border-pink-200" type="number" name="" id="" value={cardNum} />
        </div>
        <button class="h-10 my-2 px-2 bg-pink-500 rounded text-white">Pay Now</button>
      </form>
    </div>
  )
}

export default Payment
