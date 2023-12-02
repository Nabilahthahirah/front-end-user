"use client";
import Title from "../../components/cart/title.jsx";
import TableProduct from "@/components/cart/tableProduct.jsx";
import fotoProduct from "../../components/assets/logo.png";
import Summary from "@/components/cart/summary.jsx";
export default function ShoppingCart() {
  const priceProduct = 10000;
  const totalPrice = 500000;
  const subTotal = 100000000;
  return (
    <div>
      <Title title="Shopping Cart" />
      <div className="flex flex- gap-0 mx-20">
        <div className="basis-3/4">
          <TableProduct
            price={priceProduct}
            nameProduct="Sepatu Anak"
            sizeProduct="30"
            colorProduct="gray"
            photoProduct={fotoProduct}
          />
        </div>
        <div className="basis-1/4">
          <Summary click="Check Out">
            <div className="flow-root ">
              <p className="float-left">Price </p>
              <p className="float-right">
                Rp{" "}
                {subTotal.toLocaleString("id-ID", {
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
