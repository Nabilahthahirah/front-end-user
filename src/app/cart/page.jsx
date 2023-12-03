import Title from "../../components/cart/title.jsx";
import TableProduct from "@/components/cart/tableProduct.jsx";
import Summary from "@/components/cart/summary.jsx";
import fetchWithTokenServer from "@/lib/fetchWithTokenServer.js";
import fetchWithTokenClient from "@/lib/fetchWithTokenClient.js";
import { useAuthStore, useCartStore } from "@/zustand";
import { useRouter } from "next/navigation";

export default async function Cart() {
  const carts = await fetchWithTokenServer(`api/cart`, "GET", {
    cache: "no-store",
  });
  console.log("Carts", carts);
  // const [order, setorder] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const handleAddOrder = (id) => {
  //   if (order.length == 0) {
  //     setorder([{carts.id}]);
  //   }
  // };

  const totalPricea = 123213;

  return (
    <div>
      <Title title="Shopping Cart" />
      <div className="flex flex- gap-0 mx-20">
        <div className="basis-3/4">
          <TableProduct cartData={carts} />
        </div>
        <div className="basis-1/4">
          <Summary click="Check Out">
            <div className="flow-root ">
              <p className="float-left">Total Price </p>
              <p className="float-right">
                Rp{" "}
                {totalPricea.toLocaleString("id-ID", {
                  styles: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </Summary>
        </div>
      </div>
    </div>
  );
}

// export default function Cart({ data }) {
// const router = useRouter();
// const { refresh, setRefresh, token, setToken, isLoggedIn, login, logout } =
//   useAuthStore();
// const { cart, setCart } = useCartStore();
// useEffect(() => {
//   const fetchCart = async (token) => {
//     const data = await fetchWithToken("api/cart", token);
//     return await data;
//   };
//   const fetchData = async () => {
//     const storedToken = getCookie("accessToken");
//     if (storedToken) {
//       const data = await fetchCart(storedToken);
//       setCart(data.data);
//       setToken(storedToken);
//       login();
//       // router.refresh();
//     }
//   };
//   fetchData(); // Call the async function immediately
// }, [token, setToken, isLoggedIn, login, logout, refresh, setCart]);

// useEffect(() => {
//   if (cart) {
//     router.refresh();
//     console.log(cart.data);
//   }
// }, [cart, router, setRefresh, refresh]);

// if (!cart) return;

// export async function getServerSideProps() {
//   const { token } = useAuthStore();
//   const response = await fetchWithToken(`api/cart`, token);
//   const data = response.data;
//   return { props: { data } };
// }
