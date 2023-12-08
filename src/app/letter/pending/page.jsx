"use client";
export default function ThanksLetter() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex justify-center p-6 mx-6">
        <div className="card w-300 bg-base-100 shadow-xl">
          <div className="card-body p-10 text-xl">
            <div className="card-title justify-center text-2xl">
              <p className="text-center">
                Sepertinya pembayarannya ditunda ya? <br />
                hmm kalo kamu ingin pesan lagi <br />
                jangan lupa di checkout{" "}
                <a href="/shipping_fee" className="link link-primary">
                  {" "}
                  disini{" "}
                </a>{" "}
                yaa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
