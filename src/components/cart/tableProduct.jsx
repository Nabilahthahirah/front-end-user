"use client";
import Image from "next/image";
import DeleteProduct from "./deleteProduct";
import AddQuantity from "./addQuantity";
import SubtractQuantity from "./subtractQuantity";
const TableProduct = (props) => {
  const { cartData } = props;
  return (
    <table className="w-full m-6 border-gray-300 border-l-0 border-r-0 border-t-0">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Product</th>
          <th className="py-2 px-4 border-b">Price/pcs</th>
          <th className="py-2 px-4 border-b">Quantity</th>
          <th className="py-2 px-4 border-b ">Action</th>
        </tr>
      </thead>
      <tbody>
        {cartData.data.cart_product.map((cart, index) => (
          <tr key={index}>
            <td className="border-b justify-center">
              <div className="flex flex-row items-center ">
                <div className="avatar w-20 h-20">
                  <Image
                    fill
                    src={cart.product.product_detail[0].photo}
                    alt={cart.product.name}
                  />
                </div>
                <div className="ml-3">
                  <div className="font-bold">{cart.product.name}</div>
                  <div className="text-sm opacity-50">
                    {cart.product.product_detail[0].color}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 border-b text-center">
              Rp{" "}
              {cart.price.toLocaleString("id-ID", {
                styles: "currency",
                currency: "IDR",
              })}
            </td>
            <td className="py-2 border-b text-center">
              <SubtractQuantity carts={cart} />
              <label> {cart.quantity} </label>
              <AddQuantity carts={cart} />
            </td>
            <td className="py-2 border-b text-center">
              <DeleteProduct carts={cart} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TableProduct;
