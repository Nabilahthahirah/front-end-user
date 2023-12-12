"use client";
import fetchData from "@/lib/fetch";
import React, { useState, useEffect } from "react";
export default function BankTransfer({ params }) {
  const id = params.paymentId;
  const [totalPayment, setTotalPayment] = useState(0);
  useEffect(() => {
    async function fetchPayment() {
      try {
        const response = await fetchData(`api/payment/${id}`, "GET", {
          cache: "no-store",
        });
        console.log("respones", response);
        // const data = await response.data.json();
        // console.log("data", data);
        // return;
        setTotalPayment(response.data.total_price);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }
    fetchPayment();
  }, [id]);
  console.log("total payment", totalPayment);
  const url = "/upload/" + id;

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
            <li>
              Pembayaran harus dilakukan sebelum menutup page website ini.
            </li>
            <li>
              Simpan bukti transfer sebagai bukti pembayaran dan konfirmasikan
              pembayaran Anda melalui upload bukti pembayaran{" "}
              <a href={url} className="link link-primary">
                disini
              </a>
              .
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
