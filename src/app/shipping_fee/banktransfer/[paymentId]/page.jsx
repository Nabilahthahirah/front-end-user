"use client";
import fetchData from "@/lib/fetch";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/zustand";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function BankTransfer({ params }) {
  const { token, setToken, isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const id = params.paymentId;
  const [totalPayment, setTotalPayment] = useState(0);
  useEffect(() => {
    async function fetchPayment() {
      try {
        const response = await fetchData(`api/payment/${id}`, "GET", {
          cache: "no-store",
        });
        console.log("respones", response);
        setTotalPayment(response.data.total_price);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [id]);
  console.log("total payment", totalPayment);
  const url = "/upload/" + id;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const upload = async () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/payment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: idProduct,
          quantitiy: quantity,
        }),
      });
      const data = await response?.json();
      if (response.ok) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center p-6 mx-6 ">
      <div className="card w-200 bg-base-100 shadow-xl">
        <div className="card-body p-10 text-xl">
          <p className="card-title mb-3 justify-center text-2xl">
            Petunjuk Pembayaran
          </p>
          <ul className="list-decimal">
            <li>
              Mohon transfer tepat jumlah Rp{" "}
              {totalPayment.toLocaleString("id-ID", {
                styles: "currency",
                currency: "IDR",
              })}
            </li>
            <li>
              Pembayaran dilakukan melalui:
              <p> Bank Mandiri </p>
              <p> Nomor Rekening : 111232312434123</p>
              <p> Atas Nama : First Step Shop</p>
            </li>
            <li>
              Pembayaran harus dilakukan sebelum menutup page website ini.
            </li>
            <li>
              Simpan bukti transfer sebagai bukti pembayaran dan konfirmasikan
              pembayaran Anda melalui upload bukti pembayaran dibawah ini.
              <div className="m-10 max-w-md mx-auto p-6 bg-white border rounded-md shadow-md">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer"
                >
                  <input
                    required
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Selected"
                      width={500}
                      height={500}
                      className="w-32 h-32 object-cover mb-2 rounded-md"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-10 h-10 text-gray-400 mb-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 4v16m8-8H4"></path>
                      </svg>
                      <p className="text-sm text-gray-500">
                        Drag and drop or click to select a file
                      </p>
                    </div>
                  )}
                </label>
                {imageFile && (
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-gray-700">
                      {imageFile.name}
                    </p>
                  </div>
                )}
                <div className="text-center">
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    onClick={upload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <p>Catatan penting :</p>
          <ul className="list-decimal">
            <li>
              Pastikan untuk konfirmasi pembayaran melalui upload bukti
              pembayaran di tempat yang telah disediakan.
            </li>
            <li>
              Pembayaran yang tidak sesuai dengan petunjuk di atas dapat
              menghambat proses pengiriman pesanan.
            </li>
          </ul>
          <br />
          <p className="flex mb-3 justify-center">
            Terima kasih atas kepercayaan Anda pada First Step Shop.
          </p>
        </div>
      </div>
    </div>
  );
}
