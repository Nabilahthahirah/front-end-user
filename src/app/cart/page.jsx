import Title from "../../components/cart/title.jsx";
import TableProduct from "@/components/cart/tableProduct.jsx";
import Summary from "@/components/cart/summary.jsx";
import fetchWithTokenServer from "@/lib/fetchWithTokenServer.js";
export default async function Cart() {
  const carts = await fetchWithTokenServer(`api/cart`, "GET", {
    cache: "no-store",
  });
  console.log("carts", carts.data);
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mb-7">
        <Title title="Shopping Cart" />
      </div>
      <div className="flex gap-0 mx-20 mb-5">
        <div className="basis-3/4">
          <TableProduct cartData={carts} />
        </div>
        <div className="basis-1/4">
          <Summary title="Check Out" link="/shipping_fee/">
            <div className="flow-root ">
              <p className="float-left">Total Price </p>
              <p className="float-right">
                Rp{" "}
                {carts.data.total_price.toLocaleString("id-ID", {
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
