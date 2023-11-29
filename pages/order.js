import { useState,useEffect } from "react";
import { useRouter } from 'next/router';


export const OrderDetails = () => {
  const router = useRouter();
  const [order, setOrder] = useState({});
  
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
  
  const getOrderDetails = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orderdetails?id=${id}`);
      const response = await res.json();
      // alert(JSON.stringify(response,null,2))
      if(response.order){
        setOrder(response.order);
      }
      else{
        setOrder(null);
      }
      // return response;
    } catch (e) {
      alert(e.message);
      // return e.message;
      alert(e.message)
    }
  };
  
  useEffect(() => {
    const index = router.asPath.indexOf('=');
    const id = router.asPath.slice(index+1,router.asPath.length);
    if(id){
      getOrderDetails(id);
    }
  },[]);
  
  return (
    <div className="max-w-6xl px-4 mx-auto my-4 md:my-6">
      <h2 className="font-medium text-3xl dark:text-white text-center">Order Details</h2>
      <div className="mt-3 font-normal dark:text-gray-400 text-center text-gray-600">
        Check the status of recent order
        {/*<h2>{JSON.stringify(order,null,3)}</h2>*/}
      </div>
      {
        !order && <p className="text-pink-400 text-center mt-4">You have not create any order !</p>
      }
    {
     order && Object.keys(order).length==0 ? <img class="mx-auto h-10 w-10 my-5" src="/loading2.gif" alt="Loading" /> : 
    <div>
      <div className="mt-8 md:flex-row flex flex-col border border-gray-300 rounded-lg overflow-hidden">
        <div className="md:max-w-xs w-full border-r border-gray-300 bg-gray-100 dark:border-gray-300 dark:bg-gray-800">
          <div className="p-8">
            { order && <div className="grid md:grid-cols-1 sm:grid-cols-4 grid-cols-2">
                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-white">
                    Orderid
                  </div>
                  <div className="text-sm font-medium dark:text-gray-400">
                    #{order.orderId}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-white">
                    Date
                  </div>
                  <div className="text-sm font-medium dark:text-gray-400">
                    {formatDate(order.time)}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-white">
                    Subtotal
                  </div>
                  <div className="text-sm font-medium dark:text-gray-400">
                     ৳{order.amount}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-white">
                    Payment Status
                  </div>
                  <div className="text-sm font-medium dark:text-gray-400">
                    {order.status}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 dark:text-white">
                    Delivery Status
                  </div>
                  <div className="text-sm font-medium dark:text-gray-400">
                    {order.deliveryStatus}
                  </div>
                </div>
            </div>
            }
          </div>
        </div>
        <div className="flex-1 dark:bg-gray-600">
          <div className="p-8">
            
            <ul className="divide-y divide-gray-200 dark:divide-gray-500 -my-7">
              {order && order.products && Object.keys(order.products).map((key) => (
                <li
                  key={order.products[key].orderId}
                  className="flex items-stretch justify-between space-x-5 py-7"
                >
                  <div className="flex items-stretch flex-1">
                    <div className="flex-shrink-0">
                      <img
                        className="w-20 h-20 border border-gray-200 rounded-lg object-contain"
                        src={order.products[key].img}
                        // alt={product.imageSrc}
                      />
                    </div>

                    <div className="flex flex-col justify-between ml-5">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {order.products[key].name}
                        </p>
                        <p className={`mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-300`}>
                          {order.products[key].variant}
                        </p>
                      </div>

                      <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                        x {order.products[key].qty}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between ml-auto">
                    <p className="text-sm font-bold text-right text-gray-900 dark:text-white">
                      ৳{order.products[key].price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    }
    </div>
  );
};

export default OrderDetails;
