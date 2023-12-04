import fotoProduct from "../../components/assets/shoes.jpg";
import Title from "../../components/cart/title.jsx";
import Select from "@/components/cart/select";
import Summary from "@/components/cart/summary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import fetchWithTokenServer from "@/lib/fetchWithTokenServer";
import { useAuthStore } from "@/zustand";
const getAddress = async (token) => {
  console.log("token", token);
  const response = await fetchWithToken(`api/address`, token);
  console.log("response", response);
  return response.data;
};
const Shipping_fee = async () => {
  const fetchAddress = await fetchWithTokenServer(`api/address`, "GET", {
    cache: "no-store",
  });
  const addressUser = fetchAddress.data;
  const methodPayment = await fetchWithTokenServer(`api/paymentmethod`, "GET", {
    cache: "no-store",
  });
  const paymentMethods = methodPayment.data;

  const totaHarga = 10000000;
  const hargaOngkir = 2132123;
  const totalBelanja = totaHarga + hargaOngkir;
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
          <p className="font-semibold mb-5">Address</p>
          <p>
            {addressUser[0].address} {addressUser[0].city}{" "}
            {addressUser[0].postal_code} {addressUser[0].phone}
          </p>
          <div className="divider" />
          <div className="produk">
            <p className="font-semibold">Order Details</p>
            <div className="flex flex-row justify-center  mt-3">
              <div className="w-1/3">
                {" "}
                <Image src={fotoProduct} alt="produk1" />
              </div>
              <div className="w-2/3">
                <p clossName="font-semibold">{namaProduk}</p>
                <p>
                  {warnaProduk}
                  {", "}
                  {ukuranProduk}
                </p>
                <p>
                  {qty} x Rp{" "}
                  {price.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="divider" />
          <p className="font-semibold mb-5">Shipping Method</p>
          <select
            value="selectedShippingMethod"
            className="select select-primary w-full max-w-full mb-2"
          >
            <option disabled selected>
              Choose Shipping Method
            </option>
            <option>JNE</option>
          </select>
          <div className="divider" />

          <p className="font-semibold mb-5">Payment Method</p>
          <select
            value="selectedPaymentMethod"
            className="select select-primary w-full max-w-full mb-2"
          >
            <option disabled selected>
              Choose Payment Method
            </option>
            {paymentMethods.map((option) => (
              <option value={option.id}>{option.value}</option>
            ))}
          </select>

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
};
export default Shipping_fee;
