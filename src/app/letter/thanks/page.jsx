"use client";
export default function ThanksLetter({ params }) {
  const id = params.paymentId;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex justify-center p-6 mx-6">
        <div className="card w-300 bg-base-100 shadow-xl">
          <div className="card-body p-10 text-xl">
            <div className="card-title mb-3 justify-center text-2xl">
              <p className="text-center">
                Terima kasih atas pesanannya! Kami akan berikan notifikasi
                melalui <br />
                email segera setelah barang dikirim. Sementara sembari menunggu,
                <br />
                lihat produk lainnya yang mungkin kamu butuhkan. <br />
                Klik
                <a href="/" className="link link-primary">
                  {" "}
                  disini{" "}
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
