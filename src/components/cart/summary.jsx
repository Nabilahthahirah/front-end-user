"use client";
import { useRouter } from "next/navigation";
const Summary = (props) => {
  const { children, title, direct } = props;
  const router = useRouter();
  return (
    <div className="flex justify-center p-6 mx-6 ">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-3">Shopping Summary</h2>
          <div className="flow-root mb-3">{children}</div>

          <div className="card-actions justify-end">
            <button
              onClick={() => router.push(`${direct}`)}
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
