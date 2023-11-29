import { useState,useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';


const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const showToast = (msg,type) => toast.success(msg);
  
  useEffect(() => {
    // alert(localStorage.getItem('adminToken'))
    if(localStorage.getItem('adminToken')){
      router.push('/admin/dashboard');
      // alert(localStorage.getItem('adminToken'))
    }
    
    // alert(`${process.env.NEXT_PUBLIC_HOST}/admin/api/login`)
  }, []);
  
  const handleChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    if(target == 'username'){
      setUsername(value);
    }
    if(target == 'password'){
      setPassword(value);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/login`, {
          method: 'POST',
          body: JSON.stringify({
            username,password
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
    const response = await res.json();
    if(response.success){
      // Logged In Successful
      setUsername('');
      setPassword('');
      showToast("Logged in successful");
      setIsSigningIn(false);
      localStorage.setItem('adminToken',response.adminToken);
      router.push('/admin/dashboard');
      /*setTimeout(function() {
        router.push('/');
      }, 1000);*/
    }
    else{
      // Login Failed
      toast.error(response.message);
      setIsSigningIn(false);
    }
  };
    
  
  return (
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="text-pink-500 mx-auto h-12 w-auto" src="/favicon.ico" alt="Your Company"/>
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Admin login</h2>
        </div>
        <form onSubmit={handleSubmit} class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"/>
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input value={username} onChange={handleChange} id="username" name="username" type="text" autocomplete="username" required class="focus:outline-0 px-2 relative z-0 block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-100 sm:text-sm sm:leading-6" placeholder="Username"/>
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input value={password} onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required class="focus:outline-0 px-2 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-100 sm:text-sm sm:leading-6" placeholder="Password"/>
            </div>
          </div>
    
          <div>
         {
           isSigningIn ? <button disabled type="submit" class="group relative flex w-full justify-center rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              Signing In ...
            </button>
            :
            <button type="submit" class="group relative flex w-full justify-center rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                </svg>
              </span>
              Sign In
            </button>
          }
          </div>
          {isSigningIn && <img class="mx-auto h-10 w-10 mt-2" src="/loading2.gif" alt="Loading" />}
        </form>
      </div>
    </div>    
  )
}

export default Login
