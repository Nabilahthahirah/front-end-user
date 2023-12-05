"use client";
import { getCookie } from "cookies-next";
import { baseUrl } from "@/lib/constant";
import { useRouter } from "next/navigation";
export default function SubtractQuantity({ carts }) {
  const router = useRouter();
  const token = getCookie(`accessToken`);
  const handleSubtractQuantity = async (cartId, cartQty) => {
    const cartQuantity = parseInt(cartQty);
    if (cartQuantity <= 1) {
      return;
    }
    const cartSubQuantity = cartQuantity - 1;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: cartSubQuantity,
      }),
    };

    const url = `${baseUrl}/api/cartproduct/${cartId}`;
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
      className="md:px-1 md:py-0.5 lg:px-2 lg:py-1 xl:px-2 xl:py-1 bg-orange-600 text-white rounded-l"
      onClick={() => handleSubtractQuantity(carts.id, carts.quantity)}
      disable={carts.quantity < 1}
    >
      -
    </button>
  );
}
