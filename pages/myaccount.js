import {useState,useEffect} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import Error from 'next/error';

const Myaccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const [cnpassword, setCnpassword] = useState('');
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    switch (name) {
      case 'name':
        setName(value);
        break;
      
      case 'email':
        setEmail(value);
        break;
      
      case 'phone':
        if(value.length == 12){
          setPhone(phone);
        }
        else{
          setPhone(value);
        }
        break;
      
      case 'zipcode':
        if(value.length == 5){
          setZipcode(zipcode);
        }
        else{
          setZipcode(value);
        }
        break;
      
      case 'address':
        setAddress(value);
        break;
      
      case 'password':
        setPassword(value);
        break;
      
      case 'npassword':
        setNpassword(value);
        break;
      
      case 'cnpassword':
        setCnpassword(value);
        break;
      
      default:
        // code
    }
  };
  
  const updateUser = async (e) => {
    e.preventDefault()
    // Check validation of given data
    /*if(
      name.length < 3 ||
      !phone.startsWith('01') ||
      address.length < 15
      ){
        toast.error("Please enter valid information!");
        return;
      }*/
    
    // Save data in db
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/update_user`, {
      method: 'POST',
      body: JSON.stringify({
        name,email,phone,zipcode,address
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const response = await res.json();
    if(response.success){
      // alert(JSON.stringify(response,null,3));
      toast.success("Account updated successful");
      router.push('/myaccount');
    }
    else{
      toast.error("Account updated failed");
    }
  };
  
  // Change password
  const changePassword = async(e) => {
    e.preventDefault();
    // password = oldpassword
    if(password == '' || npassword == '' || cnpassword == ''){
      toast.error("Please enter your old and new password currectly!",{
        autoClose:2000
      });
      return;
    }
    if(npassword != cnpassword){
      toast.error("New password and confirm new password didn't matched!",{
        autoClose:2000
      });
      return;
    }
    else{
      // call api to change password
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/change_password`, {
        method: 'POST',
        body: JSON.stringify({
          email,password,npassword
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const response = await res.json();
      if(response.success){
        toast.success('Password changed successful');
        router.push('/myaccount');
      }
      else{
        toast.error("Oops! maybe you entered an invalid old password ",{
          autoClose: 2000
        });
      }
    }
  };
  
  useEffect(() => {
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
        // alert(JSON.stringify(response,null,2))
        setName(user.name);
        setPhone(user.phone);
        setZipcode(user.zipcode);
        setAddress(user.address);
      } catch (e) {
        toast.error("Network error");
      }
    }
    
    // 
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
    }
    
    if(!email==''){
      getUser(email);
    }
    
    
    // Check user is loggedin!
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      const isValidToken = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login?token=${token}`);
        const response = await res.json();
        if(response.success){
          setToken(token);
          setLoading(false);
        }
        else{
          setToken(null);
          setLoading(false);
        }
      }
      isValidToken()
    }
    else{
      setToken(null);
      setLoading(false);
    }
    
  },[email]);
  
  if(loading){
    return <img class="h-10 w-10 mx-auto my-5" src="/loading2.gif" alt="" />
  }
  
  if(!token){
    return <Error statusCode={404}/>
  };
  
  return (
    <div class="my-4 p-2">
      <ToastContainer
        autoClose={1000}
      />
      <h2 class="font-semibold text-center text-2xl">Update Your Account</h2>
      {email && name ? <div class="px-3">
        <form onSubmit={updateUser} class="" accept-charset="utf-8">
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="name">Name</label>
            <input placeholder="john doe" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="text" name="name" id="name" value={name} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="email">Email(Can't be changed)</label>
            <input disabled placeholder="john@gmail.com" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="email" name="email" id="email" value={email} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="phone">Phone</label>
            <input placeholder="017xxxxxxxx" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="number" name="phone" id="phone" value={phone} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="zipcode">Zip code</label>
            <input placeholder="2200" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="number" name="zipcode" id="zipcode" value={zipcode} />
          </div>
          <div class="mt-2">
            <label className="text-gray-700" htmlFor="address">Address</label>
            <textarea placeholder="Village,PO,Upazilla" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="text" name="address" id="address" value={address} ></textarea>
          </div>
          <button class="bg-pink-500 text-white px-4 py-2 rounded mt-2">Update</button>
        </form>
        {/*Change Password*/}
        <form class="mt-8" onSubmit={changePassword}>
          <div>
            <h2 class="text-xl font-medium">Change Your Password</h2>
              <div class="mt-2">
                <label className="text-gray-700" htmlFor="password">Old Password</label>
                <input placeholder="*******" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="password" name="password" id="password" value={password} />
              </div>
            <div class="flex space-x-1">
              <div class="mt-2">
                <label className="text-gray-700" htmlFor="npassword">New Password</label>
                <input placeholder="*******" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="password" name="npassword" id="npassword" value={npassword} />
              </div>
              <div class="mt-2">
                <label className="text-gray-700" htmlFor="cnpassword">Confirm Password</label>
                <input placeholder="*******" onChange={handleChange} className="h-10 px-2 w-full border focus:border focus:border-pink-300  shadow shadow-md rounded focus:outline-0" type="password" name="cnpassword" id="cnpassword" value={cnpassword} />
              </div>
            </div>
          </div>
          <button class="bg-pink-500 text-white px-4 py-2 rounded mt-2">Change Password</button>
        </form>
      </div>
        : <img class="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
        }
    </div>
  )
}

export default Myaccount
