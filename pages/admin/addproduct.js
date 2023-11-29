import { useState,useEffect } from 'react';
import Navbar from './navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from 'next/error';

const Addproduct = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [availableQty, setAvailableQty] = useState('');
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      
      case 'slug':
        setSlug(value);
        break;
      
      case 'desc':
        setDesc(value);
        break;
      
      case 'img':
        setImg(value);
        break;
      
      case 'category':
        setCategory(value);
        break;
      
      case 'size':
        setSize(value);
        break;
      
      case 'color':
        setColor(value);
        break;
      
      case 'price':
        setPrice(value);
        break;
      
      case 'availableQty':
        setAvailableQty(value);
        break;
      
      default:
        // code
    }
  };
  
  const addProduct = async(e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: 'POST',
      body: JSON.stringify(
        [
          {
            title,slug,desc,
            img,category,size,
            color,price,availableQty
          }
        ]
      ),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const response = await res.json();
    if(response.success){
      toast.success("Product added successful");
    }
    else{
      toast.error("Oops! something went wrong!");
    }
  };
  
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
      <ToastContainer/>
      <Navbar/>
      <div className="my-4 mb-5">
        <h2 className="font-bold text-3xl text-center">Add Product</h2>
        <div class="my-5">
          <form onSubmit={addProduct} class="mx-4" accept-charset="utf-8">
            <div class="my-1">
              <label for="text-lg font-semibold">Title</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="text" name="title" id="" value={title} />
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Slug</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="text" name="slug" id="" value={slug} />
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Description</label>
              <textarea onChange={handleChange} className="mt-2 h-28 resize-none px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="text" name="desc" id="" value={desc} ></textarea>
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Image Url</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="url" name="img" id="" value={img} />
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Category</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="text" name="category" id="" value={category} />
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Size</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="text" name="size" id="" value={size} />
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Color</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="text" name="color" id="" value={color} />
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Price</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="number" name="price" id="" value={price} />
            </div>
            <div class="my-1">
              <label for="text-lg font-semibold">Available Quantity</label>
              <input onChange={handleChange} className="mt-2 h-10 px-2 rounded w-full border border-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 " type="number" name="availableQty" id="" value={availableQty} />
            </div>
            <button
              class="mt-3 inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
              Add Product
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 ml-2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Addproduct
