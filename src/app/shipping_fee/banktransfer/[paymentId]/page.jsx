"use client";
import fetchData from "@/lib/fetch";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { baseUrl } from "@/lib/constant";
export default function BankTransfer({ params }) {
  const id = params.paymentId;
  const [totalPayment, setTotalPayment] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadPhoto, setUploadPhoto] = useState("");
  useEffect(() => {
    async function fetchPayment() {
      try {
        const response = await fetchData(`api/payment/${id}`, "GET", {
          cache: "no-store",
        });
        console.log("respones", response);
        setTotalPayment(response.data.total_price);
        setUploadPhoto(response.data.upload);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [id]);
  console.log("total payment", totalPayment);
  const url = "/upload/" + id;

  const handleImageChange = async (e) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile == null) {
      toast.warn("select a photo first");
    } else {
      toast.info("Wait a minute, uploading foto");
      toast.warn("dont press any button");
      try {
        const formData = new FormData();
        formData.append("upload", imageFile);
        const responseData = await fetch(
          `${baseUrl}/api/payment/upload/${id}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (responseData.status == 200) {
          toast.success("Upload successful!");
          setImagePreview("");
          router.refresh();
        } else {
          toast.error(`${responseData.message}`);
        }
      } catch (error) {
        console.error(`Error: ${error.message || "Unknown error"}`);
      }
    }
  };
  return (
    <div className="flex justify-center p-6 mx-6">
      <div className="card w-300 bg-base-100 shadow-xl">
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
            <li>Pembayaran harus dilakukan sebelum menutup halaman ini.</li>
            <li>
              Simpan bukti transfer sebagai bukti pembayaran dan konfirmasikan
              pembayaran Anda melalui upload bukti Pembayaran. Jika terjadi
              kesalahan dalam upload foto, maka anda bisa upload foto kembali
              sebelum menutup halaman ini.
              {/* {uploadPhoto != "" ? (
                <div>
                  <div className=" avatar h-80 flex justify-center mt-6">
                    <Image
                      className=" avatar h-80 flex justify-center mt-6"
                      src={uploadPhoto}
                      // fill
                      fill
                      objectFit="contain"
                      // className="w-32 h-32 object-cover mb-2 rounded-md"
                    />
                  </div>
                  <div className="m-10 max-w-md mx-auto p-6 bg-white border rounded-md shadow-md">
                    <form onSubmit={handleSubmit}>
                      <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer"
                      >
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
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
                      {imagePreview && (
                        <div className="mt-4">
                          <p className="text-lg font-semibold text-gray-700">
                            {imagePreview.name}
                          </p>
                        </div>
                      )}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : ( */}
              <div className="m-10 max-w-md mx-auto p-6 bg-white border rounded-md shadow-md">
                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer"
                  >
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
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
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-lg font-semibold text-gray-700">
                        {imagePreview.name}
                      </p>
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
              {/* )} */}
            </li>
            <li>
              Tunggu konfirmasi admin First Step Shop. Informasi selanjutnya
              akan disampaikan melalui email Anda.
            </li>
          </ul>
          <br />
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
