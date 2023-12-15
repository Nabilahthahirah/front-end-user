"use client";
import { useRouter } from "next/navigation";
const Summary = (props) => {
  const { children, title, link } = props;
  const router = useRouter();
  return (
    <div className="flex justify-center p-6 mx-6 ">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-3">Shopping Summary</h2>
          <div className="flow-root mb-3">
                <div>
                  <div className="flow-root ">
                    <p className="float-left">Price </p>
                    <p className="float-right">
                      Rp{" "}
                      {subTotal.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                </div>
          </div>

          <div className="card-actions justify-end">
            <button
              onClick={() => router.push(`${link}`)}
              className="btn btn-primary text-white
            "
            >
              {title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Summary;