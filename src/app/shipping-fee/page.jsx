"use client";

import React, { useState, useEffect } from 'react';
import FormAddress from "@/components/cart/formAddress";
import fotoProduct from "@/components/assets/logo.png";
import Title from "@/components/cart/title.jsx";
import Select from "@/components/cart/select";
import Summary from "@/components/cart/summary";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { baseUrl } from '@/lib/constant';

export default function ShippingFee() {

  const token = getCookie(`accessToken`);
  const [cartProduct, setCartProduct] = useState([]);

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
        // calculateSubTotal(data.data.cart_product);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchCart();
  }, [token]);

  const totaHarga = 10000000;
  const hargaOngkir = 2132123;
  const totalBelanja = totaHarga + hargaOngkir;
  const address = [
    {
      name: "jalan nasdasdsadasdi",
      city: "Palembang",
      postalCode: "213213",
      phone: "1231231",
    },
  ];
  const optionAddress = `${address[0].name} ${address[0].city} ${address[0].postalCode} Phone: ${address[0].phone}`;
  const namaProduk = "Sepatu Anak";
  const warnaProduk = "grey";
  const ukuranProduk = "30";
  const qty = 2;
  const price = 100000;
  return (
    <div>
      <Title title="Check Out" />
      <div className="flex flex-row gap-0 mx-20">
        <div className="basis-3/4 mx-5">
          {/* <Select
            title="Address"
            disableSelected="Choose Address"
            option={optionAddress}
          >
            <button
              className="btn btn-primary text-white "
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Address
            </button>
            <FormAddress />
          </Select> */}
          {/* <div className="divider" /> */}
          <div className="produk">
            <p className="font-semibold">Order Details</p>
            {cartProduct.length > 0 && cartProduct.map(cartP => (
            <div className="flex flex-row justify-center  mt-3">
              <div className="w-1/3">
                {" "}
                <Image src={fotoProduct} alt="produk1" />
              </div>
              <div className="w-2/3">
                <p clossName="font-semibold">{cartP.product.name}</p>
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
            options={["JNE", "TIKI", "POS"]}
          />
          <div className="divider" />
          <Select
            title="Payment Method"
            disableSelected="Choose Payment"
            options={["QRIS", "Go"]}
          />
          <div className="mb-10" />
        </div>
        <div className="basis-1/4 space-0">
          <Summary click="Purchase">
            <div className="flow-root">
              <p className="float-left">Price</p>
              <p className="float-right">
                Rp{" "}
                {totaHarga.toLocaleString("id-ID", {
                  styles: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            <div className="border-b">
              <div className="flow-root">
                <p className="float-left">Shipping Price</p>
                <p className="float-right">
                  Rp{" "}
                  {hargaOngkir.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
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
          </Summary>
        </div>
      </div>
    </div>
  );
}
