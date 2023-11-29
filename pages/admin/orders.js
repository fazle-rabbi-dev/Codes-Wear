import { useEffect,useState } from 'react';
import Navbar from './navbar';
import Link from 'next/link';
import Error from 'next/error';

const Vieworders = () => {
  const [orders, setOrders] = useState(null)
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    
    const getOrders = async() => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_all_orders`);
      const response = await res.json();
      if(response){
        setOrders(response.orders);
      }
      // alert(JSON.stringify(response,null,3));
    };
    
    getOrders();
    
    
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
      <Navbar/>
      <div className="my-4">
        <h2 className="font-bold text-3xl text-center">Customers Orders</h2>
        <div class="mt-3">
        {
         orders && orders.length==0 ? <h2 class="font-bold text-sm text-center my-5">No order found!</h2> : orders ? <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-gray-200 border-b">
                      <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Email
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Order Id
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Address
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Payment Status
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Edit
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      orders.map(order=>{
                      return(
                          <tr class="border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td class="whitespace-nowrap px-6 py-4 space-nowrap text-sm font-medium text-black">
                              {order.email}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4 space-nowrap text-sm font-medium text-gray-900">
                              {order.orderId}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {order.address}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {order.status}
                            </td>
                            <Link href={`/admin/edit?id=${order._id}`} legacyBehavior>
                              <td class="text-pink-500 underline  text-sm font-light px-6 py-4 whitespace-nowrap">
                                Edit
                              </td>
                            </Link>
                            <Link href={`/admin/delete?id=${order._id}`} legacyBehavior>
                              <td class="text-pink-500 underline  text-sm font-light px-6 py-4 whitespace-nowrap">
                                Delete
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
      </div>
    </>
  )
}

export default Vieworders
