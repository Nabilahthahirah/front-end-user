"use client"
import Header from '@/components/account/header'
import CardOrder from '@/components/account/order-history/cardOrder'
import React, { useEffect, useState } from 'react'
import { getCookie } from "cookies-next"
import { baseUrl } from '@/lib/constant'

const page = () => {

  const token = getCookie(`accessToken`);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`${baseUrl}/api/order/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setOrders(data.data);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }

    fetchOrder();
  }, [token]);

  return (
    <div className='w-full px-4 pt-6 mb-8'>
      <Header />
      <div className='divider'></div>
      <div className="w-3/4 mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        {orders.map((order) => (
          <CardOrder 
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  )
}

export default page