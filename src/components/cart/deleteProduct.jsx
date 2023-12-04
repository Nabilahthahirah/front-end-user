"use client";
import { getCookie } from "cookies-next";
import { baseUrl } from "@/lib/constant";
import { useRouter } from "next/navigation";
export default function DeleteProduct({ carts }) {
  const router = useRouter();
  const token = getCookie(`accessToken`);
  const handleDelete = async (cartsId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: "DELETE",
      headers,
    };

    const url = `${baseUrl}/api/cartproduct/${cartsId}`;
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    router.refresh();
    if (!response.ok) {
      if (response.statusText === `Unauthorized`) {
        return `Unauthorized`;
      }
      console.log(url, requestOptions);
      return data.message || "Error fetching data";
    }
    return data;
  };
  return (
    <button
      className="btn bg-red-500 text-white"
      onClick={() => handleDelete(carts.id)}
    >
      delete
    </button>
  );
}
