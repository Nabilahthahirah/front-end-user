"use client"
import React, {useEffect, useState} from 'react';
import ModalOrderDetail from './modalOrderDetail';
import { getCookie } from "cookies-next";
import { baseUrl } from '@/lib/constant';

const OrderHistory = ({order}) => {

  const token = getCookie(`accessToken`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // console.log(`status: ${order.order_status[0].id}`)

  const statusId = order.order_status[0].id

  useEffect(() => {
    async function fetchOrderStatus() {
      try {
        const response = await fetch(`${baseUrl}/api/order-status/${statusId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setOrderStatus(data.data.status);

      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    }

    fetchOrderStatus();
  }, [token, statusId]);
  
  return (
    <div className="bg-white border rounded-md shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">Order ID: {order.id}</p>
        <p className="text-sm text-gray-500">Date: {formatDate(order.updated_at)}</p>
      </div>
      <p className="text-lg font-semibold">Total Amount: Rp{order.price + order.shipping_price}</p>
      <p className="text-sm text-gray-600">Status: {orderStatus}</p>

      <div className="flex justify-between items-center mb-2">
        <div></div>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={openModal}
        >
          See Detail
        </button>
      </div>

      {/* Modal untuk detail pesanan */}
      <ModalOrderDetail
        isOpen={isModalOpen}
        onClose={closeModal}
        order={order}
        orderStatus={orderStatus}
      />
    </div>
      
  );
};

export default OrderHistory;
