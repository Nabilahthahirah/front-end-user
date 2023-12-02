"use client";
import Title from "../../components/cart/title.jsx";
import TableProduct from "@/components/cart/tableProduct.jsx";
import { useEffect, useState } from "react";
import fotoProduct from "../../components/assets/shoes.jpg";
import { getCookie } from "cookies-next";
import Summary from "@/components/cart/summary.jsx";
import fetchWithToken from "@/lib/fetchWithToken.js";

export default async function ShoppingCart() {
  const token = getCookie(`accessToken`);
  // const cartProduct = await fetchWithToken(`api/cart`, token);

  const [data, setData] = useState(null);
  console.log("data", data);
  const totalPrice = 500000;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWithToken(`api/cart`, token);
      console.log(response);
      const result = await response.json();
      setData(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Title title="Shopping Cart" />
      <div className="flex flex- gap-0 mx-20">
        <div className="basis-3/4">
          <TableProduct
            cartProduct={data}
            // price="50000"
            // nameProduct="Sepatu Anak"
            // sizeProduct="30"
            // colorProduct="gray"
            // photoProduct={fotoProduct}
          />
        </div>
        <div className="basis-1/4">
          <Summary click="Check Out">
            <div className="flow-root ">
              <p className="float-left">Total Price </p>
              <p className="float-right">
                Rp{" "}
                {totalPrice.toLocaleString("id-ID", {
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
