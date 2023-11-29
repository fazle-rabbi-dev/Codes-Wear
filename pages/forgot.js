import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [npassword, setNpassword] = useState('');
  const [cnpassword, setCnpassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  
  const forgotPassword = async(e) => {
    e.preventDefault();
    if(email){
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
          method: 'POST',
          body: JSON.stringify({
            email
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
          // alert('ok')
        if(response.success){
          toast.success(response.message);
        }
        else{
          toast.error(response.message);
        }
        // alert(JSON.stringify(response,null,2))
    }
  };
  
  const resetPassword = async(e) => {
    e.preventDefault();
    setIsUpdating(true);
    if(npassword == cnpassword){
      const token = router.query.token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/reset_password`, {
        method: 'POST',
        body: JSON.stringify({
          token,npassword
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const response = await res.json();
      if(response.success){
        setIsUpdating(false);
        toast.success(response.message);
      }
      else{
        setIsUpdating(false);
        toast.error(response.message);
      }
    }
    else{
      setIsUpdating(false);
      toast.error("New password & confirm new password didn't matched!");  
    }
  };
  
  useEffect(() => {
    if(router.asPath.includes('token')){
      setToken(true);
      setLoading(false);
    }
    else{
      setToken(false);
      setLoading(false);
    }
  },[]);
  
  return (
    <div class="my-4">
      <ToastContainer/>
      <h2 class="text-center text-2xl font-bold">Forgot Your Password</h2>
      {
        loading ? <img class="h-10 w-10 mx-auto my-5" src="/loading2.gif" alt="" />
        : token ? <form onSubmit={resetPassword} class="mt-2 px-4">
          <div class="">
            <label for="">New Password</label>
            <input onChange={(e)=>setNpassword(e.target.value)} class="pl-2 w-full h-10 border border-1 shadow shadow-lg rounded outline-0" type="password" name="npassword" id="" value={npassword} />
          </div>
          <div class="">
            <label for="">Confirm New Password</label>
            <input onChange={(e)=>setCnpassword(e.target.value)} class="pl-2 w-full h-10 border border-1 shadow shadow-lg rounded outline-0" type="password" name="cnpassword" id="" value={cnpassword} />
          </div>
          <button disabled={isUpdating} class="disabled:bg-pink-300 bg-pink-500 text-sm p-2 my-2 text-white rounded">Continue</button>
        </form>
        :
        <form onSubmit={forgotPassword} class="mt-2 px-4">
          <div class="">
            <label for="">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} class="pl-2 w-full h-10 border border-1 shadow shadow-lg rounded outline-0" type="email" name="" id="" value={email} />
          </div>
          <button class="bg-pink-500 text-sm p-2 my-2 text-white rounded">Continue</button>
       </form>
      }
    </div>
  )
}

export default Forgot