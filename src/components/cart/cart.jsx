"use client";
import React, { useState, useEffect } from 'react';
import fetchWithTokenClient from '@/lib/fetchWithTokenClient';
import { getCookie } from "cookies-next";
import { baseUrl } from '@/lib/constant';
import { FaTrash } from "react-icons/fa6";
import Link from "next/link"

const TableProduct = ({ cartP }) => {
  const token = getCookie(`accessToken`);
  const [cartProduct, setCartProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(`${baseUrl}/api/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setCartProduct(data.data.cart_product);
        calculateSubTotal(data.data.cart_product);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchCart();
  }, [token]);

  const calculateSubTotal = (cartProduct) => {
    let total = 0;

    cartProduct.forEach((item) => {
      total += item.price * item.quantity;
    });

    setSubTotal(total);
  };

  const handleIncrement = async (cartItemId) => {
    try {
      setCartProduct((prevCartProduct) => {
        const updatedCart = prevCartProduct.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        calculateSubTotal(updatedCart);
        return updatedCart;
      });

      // Update the quantity on the backend
      await updateQuantity(cartItemId, cartProduct.find(item => item.id === cartItemId).quantity + 1);
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async (cartItemId) => {
    try {
      setCartProduct((prevCartProduct) => {
        const updatedCart = prevCartProduct.map(item =>
          item.id === cartItemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        calculateSubTotal(updatedCart);
        return updatedCart;
      });

      // Update the quantity on the backend
      await updateQuantity(cartItemId, cartProduct.find(item => item.id === cartItemId).quantity - 1);
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await fetch(`${baseUrl}/api/cartproduct/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity on the backend');
      }
    } catch (error) {
      console.error('Error updating quantity on the backend:', error);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      const response = await fetch(`${baseUrl}/api/cartproduct/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart product');
      }

      const updatedCart = cartProduct.filter(item => item.id !== cartItemId);
      setCartProduct(updatedCart);

      calculateSubTotal(updatedCart);
    } catch (error) {
      console.error('Error deleting cart product:', error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="flex flex- gap-0 mx-20">
      <div className="basis-3/4">
        <table className="w-full m-6 border-gray-300 border-l-0 border-r-0 border-t-0">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartProduct.length > 0 && cartProduct.map(cartP => (
              <tr key={cartP.id}>
                <td className="border-b justify-center">
                  <div className="flex flex-row items-center ">
                    <div className="ml-3">
                      <div className="font-bold">{cartP.product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-2 border-b text-center">
                  Rp{" "}
                  {cartP.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="py-2 border-b text-center">
                  <button
                    id="decrement"
                    onClick={() => handleDecrement(cartP.id)}
                    className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-l"
                  >
                    -
                  </button>
                  <label> {cartP.quantity} </label>
                  <button
                    id="increment"
                    onClick={() => handleIncrement(cartP.id)}
                    className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-r"
                  >
                    +
                  </button>
                </td>
                <td className="py-2 border-b text-center">
                  <button
                    onClick={toggleEditMode}
                    className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-primary text-white rounded-l"
                  >
                    {editMode ? "Done" : "Ubah"}
                  </button>
                  {editMode && (
                    <button
                      onClick={() => handleDelete(cartP.id)}
                      className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-red-600 text-white rounded-r"
                    >
                      <FaTrash size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="basis-1/4">
        <div className="flex justify-center p-6 mx-6 ">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-3">Shopping Summary</h2>
              <div className="flow-root mb-3">
                <div>
                  <div className="flow-root ">
                    <p className="float-left">Price </p>
                    <p className="float-right">
                      Rp{" "}
                      {subTotal.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end">
                <Link href='/shipping-fee'>
                  <button
                    className="btn btn-primary text-white"
                  >
                    Check Out
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableProduct;
