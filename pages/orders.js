import {useState,useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Error from 'next/error';

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function getOrders(token){
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_orders`, {
          method: 'POST',
          body: JSON.stringify({
            token
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const response = await res.json();
        // alert(JSON.stringify(response,null,3));
        setOrders(response.orders);
      } catch (e) {
        alert("Error: "+e.message);
      }
    }
    
    const token = localStorage.getItem('token');
    if(token){
      getOrders(token);
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
  },[]);
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  if(loading){
    return <img class="h-10 w-10 mx-auto my-5" src="/loading2.gif" alt="" />
  }
  
  if(!token){
    return <Error statusCode={404}/>
  };
  
  return (
    <div class="">
        <h2 class="my-4 text-center font-medium text-3xl dark:text-white">My Orders</h2>
        <div class="text-sm text-gray-600 text-center mt-3 font-normal dark:text-gray-400">
          Check the status of recent and old orders &amp; discover more products
        </div>
        {
         orders && orders.length==0 ? <h2 class="font-bold text-sm text-center my-5">You have not created any order yet.!</h2> : orders ? <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-gray-200 border-b">
                      <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          #Orderid
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Date
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Email
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Amount
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      orders.map(order=>{
                      return(
                          <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order.orderId.slice(24,order.orderId.length)}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatDate(order.time)}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {order.email}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {order.amount}
                            </td>
                            <Link href={`/order?id=${order._id}`} legacyBehavior>
                              <td class="text-pink-500 underline  text-sm font-light px-6 py-4 whitespace-nowrap">
                                Details
                              </td>
                            </Link>
                          </tr>
                        )
                      })  
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>  
          : <img class="h-10 w-10 mx-auto my-5" src="/loading2.gif" alt="" />
        }
      </div>
  )
}

export default Orders