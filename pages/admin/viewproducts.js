import { useEffect,useState } from 'react';
import Navbar from './navbar';
import Link from 'next/link';
import Error from 'next/error';

const Viewproducts = () => {
  const [products, setProducts] = useState(null)
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const getProducts = async() => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproducts`);
      const response = await res.json();
      if(response){
        setProducts(response.products);
      }
    };
    getProducts();
    
    // Check is admin logged in !
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
        <h2 className="font-bold text-3xl text-center">All Products</h2>
        <div class="mt-3">
        {
         products && Object.keys(products).length==0 ? <h2 class="font-bold text-sm text-center my-5">No product found!</h2> : products ? <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-gray-200 bproduct-b">
                      <tr>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Title
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Desc
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Slug
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Price
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
                      Object.keys(products).map(product=>{
                      return(
                          <tr class="border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td class="whitespace-nowrap px-6 py-4 space-nowrap text-sm font-medium text-black">
                              {products[product].title.slice(0,20)}...
                            </td>
                            <td class="whitespace-nowrap px-6 py-4 space-nowrap text-sm font-medium text-gray-900">
                              {products[product].desc.slice(0,20)}...
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {products[product].slug}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {products[product].price}
                            </td>
                            <Link href={`/product?id=${product._id}`} legacyBehavior>
                              <td class="text-pink-500 underline  text-sm font-light px-6 py-4 whitespace-nowrap">
                                Edit
                              </td>
                            </Link>
                            <Link href={`/product?id=${product._id}`} legacyBehavior>
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

export default Viewproducts
