import { useEffect,useState } from 'react';
import Navbar from './navbar';
import Error from 'next/error';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    if(localStorage.getItem('adminToken')){
      const token = localStorage.getItem('adminToken');
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
  },[]);
  
  if(loading){
    return <img class="h-10 w-10 mx-auto my-5" src="/loading2.gif" alt="" />
  }
  
  if(!token){
    return <Error statusCode={404}/>
  };
  
  return (
    <>
      {
        <div>
          <Navbar/>
          <div class="my-4">
            <h2 class="text-center font-bold text-3xl">Dashboard</h2>
          </div>
        </div>
      }
    </>
  )
}

export default Dashboard;