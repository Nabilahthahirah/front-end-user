"use client";
import fotoProduct from "../../components/assets/shoes.jpg";
import Title from "../../components/cart/title.jsx";
import Select from "@/components/cart/select";
import Summary from "@/components/cart/summary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import fetchWithToken from "@/lib/fetchWithToken";
import { useAuthStore } from "@/zustand";
const getAddress = async (token) => {
  console.log("token", token);
  const response = await fetchWithToken(`api/address`, token);
  console.log("response", response);
  return response.data;
};
const Shipping_fee = async () => {
  // export default function ShippingFee() {
  const router = useRouter();
  const { token, setToken, isLoggedIn, login, logout } = useAuthStore();
  // if (!isLoggedIn) {
  //   router.push("/auth/login");
  //   return;
  // }

  const totaHarga = 10000000;
  const hargaOngkir = 2132123;
  const totalBelanja = totaHarga + hargaOngkir;
  // const address = [
  //   {
  //     name: "jalan nasdasdsadasdi",
  //     city: "Palembang",
  //     postalCode: "213213",
  //     phone: "1231231",
  //   },
  // ];
  const namaProduk = "Sepatu Anak";
  const warnaProduk = "grey";
  const ukuranProduk = "30";
  const qty = 2;
  const price = 100000;

  const address = await getAddress(token);
  console.log("address", address);
  const optionAddress = `${address.address} ${address.city} ${address.postal_code} Phone: ${address.phone}`;
  return (
    <div>
      <Title title="Check Out" />
      <div className="flex flex-row gap-0 mx-20">
        <div className="basis-3/4 mx-5">
          <p className="font-semibold mb-5">Address</p>
          <p>{optionAddress}</p>
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
          <Select
            title="Shipping Method"
            disableSelected="Choose Shipping"
            option="JNE"
          />
          <div className="divider" />
          <Select
            title="Payment Method"
            disableSelected="Choose Payment"
            option="QRIS"
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
};
export default Shipping_fee;
