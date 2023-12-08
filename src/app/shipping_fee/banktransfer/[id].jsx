import { useRouter } from "next/navigation";
export default function BankTransfer() {
  const router = useRouter();
  const { id } = router.query;
  console.log("id: ", id);
  return (
    // <div className="flex justify-center items-center min-h-screen">
    <div className="flex justify-center p-6 mx-6">
      <div className="card w-300 bg-base-100 shadow-xl">
        <div className="card-body p-10 text-xl">
          <p className="card-title mb-3 justify-center text-2xl">
            PAYMENT BY BANK TRANSFER {id}
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
              <a href="" className="link link-primary">
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
