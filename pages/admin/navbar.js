import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();
  
  const logout = () => {
    if(localStorage.getItem('adminToken')){
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
      toast.success('Logout successful');
    }
    else{
      router.push('/admin/login');
    }
  };
  
  return (
    <div class="justify-center items-center h-15 bg-indigo-600 flex overflow-x-auto flex-row flex-wrap items-center space-x-5 p-3 text-white">
      <ToastContainer/>
      <Link href="/admin/dashboard" legacyBehavior>
        <a class="">Dashboard</a>
      </Link>
      <Link href="/admin/addproduct" legacyBehavior>
        <a class="">Add Product</a>
      </Link>
      <Link href="/admin/viewproducts" legacyBehavior>
        <a class="">View Products</a>
      </Link>
      <Link href="/admin/orders" legacyBehavior>
        <a class="">Orders</a>
      </Link>
       <a onClick={logout} class="">Logout</a>
    </div>
  )
}

export default Navbar
