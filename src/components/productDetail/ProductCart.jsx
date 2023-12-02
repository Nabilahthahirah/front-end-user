'use client'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/zustand';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/lib/constant';
import { ToastContainer, toast } from "react-toastify";

export default function ProductCart({productDetail}) {
  const [options, setOption] = useState([]);

  const { token, setToken, isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();

  const addToCart = async () => {
    const idProduct = productDetail.product_detail[0].id;
    if (!isLoggedIn) {
      router.push("/auth/login");
      return
    }

    try {
      const response = await fetch(`${baseUrl}/api/cart/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: idProduct,
        }),
      });

      const data = await response?.json();
      if (response.ok) {
        console.log(data);
        toast.success("Login successful!");
        router.refresh();
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <div>
      <p>Warna : {productDetail.product_detail.map((item, index) => {
        return (
          <span className="badge badge-info gap-2" key={index}>
            {item.color}
          </span>
        )
      })}</p>
      <p className='mb-5'>Berat : {productDetail.product_detail[0].weight} Kg</p>
      <p>Qty : </p>
      <select className="select select-bordered select-sm w-full max-w-xs">
        {[1,2,3,4,5,6,7,8,9,10].map((item, index) => {
          return <option key={index} value={item}>{item}</option>
        })}
      </select>
      <button className="btn btn-success mt-5" onClick={addToCart}>Add To Cart</button>
    </div>
  )
}
