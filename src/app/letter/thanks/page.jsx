"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function ThanksLetter({ params }) {
  const searchParams = useSearchParams();
  const transaction_status = searchParams.get("transaction_status");
  console.log("status", transaction_status);
  if (transaction_status == "pending") {
    return router.push(`/letter/pending`);
  }
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen">
      <div className="flex justify-center p-6 mx-6">
        <div className="card w-200 bg-base-100 shadow-xl">
          <div className="card-body p-10 text-xl">
            <div className="card-title mb-3 justify-center text-2xl">
              <p>
                {/* Salam Hormat dari First Step Shop!
              
                <br />
                Kami ingin mengucapkan terima kasih atas kepercayaan Anda dalam
                berbelanja di toko kami. Pembelian Anda sangat berarti bagi
                kami, dan kamzi berharap produk yang Anda pilih dapat memberikan
                kepuasan yang maksimal. <br />
                <br />
                Kami selalu berkomitmen untuk memberikan pelayanan terbaik
                kepada pelanggan kami. Jika Anda memiliki pertanyaan atau
                membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi
                kami. Kami siap membantu dengan senang hati.
                <br />
                <br />
                Kembali lagi untuk berbelanja di toko kami adalah suatu
                kehormatan bagi kami. Terima kasih atas dukungan dan kepercayaan
                Anda. Semoga produk yang Anda beli membawa manfaat dan
                kebahagiaan bagi Anda.
                <br />
                <br />
                Sekali lagi, terima kasih banyak!
                <br />
                <br />
                Hormat kami,
                <br />
                <br />
                First Step Shop */}
                Terima kasih atas pesanannya! Kami akan berikan notifikasi
                melalui <br />
                email segera setelah barang dikirim. Sementara sembari menunggu,
                <br />
                lihat produk lainnya yang mungkin kamu butuhkan. <br />
                Klik{" "}
                <a href="/" className="link link-primary">
                  disini
                </a>{" "}
                untuk melanjutkan belanja.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
