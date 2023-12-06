"use client";

import React, { useState, useEffect } from 'react';
import FormAddress from "@/components/cart/formAddress";
import fotoProduct from "@/components/assets/logo.png";
import Title from "@/components/cart/title.jsx";
import Select from "@/components/cart/select";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { baseUrl } from '@/lib/constant';
import Link from "next/link";

export default function ShippingFee() {

  const token = getCookie(`accessToken`);
  const [cartProduct, setCartProduct] = useState([]);
  const [cart, setCart] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedShippingOption, setSelectedShippingOption] = useState('');
  const [subTotal, setSubTotal] = useState(0);

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

        setCart(data.data.id)
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

  // Shipping

  const handleShippingOptionChange = (selectedOption) => {
    setSelectedShippingOption(selectedOption.toLowerCase());
  };

  const courier = selectedShippingOption

  useEffect(() => {
    async function fetchShipping() {
      try {
        const response = await fetch(`${baseUrl}/api/shipping/${cart}?courier=${courier}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        const data = await response.json();

        setShippingFee(data.data);

      } catch (error) {
        console.error('Error fetching fee:', error);
      }
    }

    fetchShipping();
  }, [token, cart, courier]);

  console.log(`cart: ${cart}`)
  console.log(`selectedShippingOption: ${selectedShippingOption}`)
  console.log(`shippingFee: ${shippingFee}`)
  const totalBelanja = shippingFee + subTotal;
  return (
    <div>
      <Title title="Check Out" />
      <div className="flex flex-row gap-0 mx-20">
        <div className="basis-3/4 mx-5">
          <div className="produk">
            <p className="font-semibold">Order Details</p>
            {cartProduct.length > 0 && cartProduct.map(cartP => (
            <div className="flex flex-row justify-center  mt-3">
              <div className="w-1/3">
                {" "}
                <Image src={fotoProduct} alt="produk1" />
              </div>
              <div className="w-2/3">
                <p className="font-semibold">{cartP.product.name}</p>
                <p>
                  {cartP.quantity} x Rp{" "}
                  {cartP.price.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            </div>
            ))}
          </div>
          <div className="divider" />
          <Select
            title="Shipping Method"
            disableSelected="Choose Shipping"
            options={["Jne", "Tiki", "POS"]}
            onChange={handleShippingOptionChange}
          />
          <div className="divider" />
          <Select
            title="Payment Method"
            disableSelected="Choose Payment"
            options={["QRIS", "Transfer"]}
          />
          <div className="mb-10" />
        </div>
        <div className="basis-1/4">
          <div className="flex justify-center p-6 mx-6 ">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-3">Shopping Summary</h2>
                <div className="flow-root mb-3">
                  <div>
                    <div className="flow-root">
                      <p className="float-left">Price</p>
                      <p className="float-right">
                        Rp{" "}
                        {subTotal.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                    <div className="border-b">
                      <div className="flow-root">
                        <p className="float-left">Shipping Price</p>
                        <p className="float-right">
                          {shippingFee !== undefined && shippingFee !== 0
                            ? shippingFee.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="float-left">Shopping Price</p>
                      <p className="float-right">
                        Rp{" "}
                        {totalBelanja.toLocaleString("id-ID", {
                          styles: "currency",
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
    </div>
  );
}
