"use client";
export default function BankTransfer({ params }) {
  const id = params.paymentId;
  return (
    // <div className="flex justify-center items-center min-h-screen">
    <div className="flex justify-center p-6 mx-6">
      <div className="card w-300 bg-base-100 shadow-xl">
        <div className="card-body p-10 text-xl">
          <p className="card-title mb-3 justify-center text-2xl">
            PAYMENT BY BANK TRANSFER (payment id = {id})
          </p>
          <ul className="list-decimal">
            <li>
              Silahkan transfer:
              <p> Bank Mandiri </p>
              <p> Nomor Rekening : 111232312434123</p>
              <p> Atas Nama : First Step Shop</p>
            </li>
            <li>
              {" "}
              <a href="/upload/${id}" className="link link-primary">
                Upload bukti pembayaran
              </a>
            </li>
            <li>
              Menunggu konfirmasi admin (cek email untuk informasi selanjutnya)
            </li>
          </ul>
        </div>
      </div>
    </div>
    // </div>
  );
}
