"use client";

import React, { useState, useEffect } from "react";
import Title from "@/components/cart/title.jsx";
import Select from "@/components/shippingFee/select";
import fetchData from "@/fetch";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { baseUrl } from "@/lib/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function ShippingFee() {
  const token = getCookie(`accessToken`);
  const router = useRouter();
  const [cartProduct, setCartProduct] = useState([]);
  const [cart, setCart] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectedShippingOption, setSelectedShippingOption] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [addressUser, setAddressUser] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
  const [tokenMidtrans, setTokenMidtrans] = useState("");
  const [paymentId, setPaymentId] = useState(0);
  const [orderStatusId, setOrderStatusId] = useState(0);
  // const [dataUser, setDataUser] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchPaymentMethod() {
      try {
        const { data } = await fetchData(`api/paymentmethod`, "GET", {
          cache: "no-store",
        });

        setPaymentMethod(data);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPaymentMethod();
  }, []);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(`${baseUrl}/api/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setCart(data.data.id);
        setCartProduct(data.data.cart_product);
        calculateSubTotal(data.data.cart_product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchCart();
  }, [token]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${baseUrl}/api/user/detail/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsername(data.data[0].username);
        setEmail(data.data[0].email);
        // setEmail(Base64.encodeURI(data.data[0].email));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchUser();
  }, [token]);
  // console.log("dataUser :  ", username, email);
  // console.log(username);
  // console.log(email);

  useEffect(() => {
    async function fetchAddress() {
      try {
        const response = await fetch(`${baseUrl}/api/address/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setAddressUser(data.data[0]);
        setProvinceId(data.data[0].province_id);
        setCityId(data.data[0].city_id);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
    fetchAddress();
  }, [token]);
  // console.log("addressUser", addressUser);
  // console.log("provinceId", provinceId);
  // console.log("cityId", cityId);

  useEffect(() => {
    async function fetchProvince() {
      try {
        const { data } = await fetchData(
          `api/user/province/${provinceId}`,
          "GET",
          {
            cache: "no-store",
          }
        );

        setProvince(data.name);
      } catch (error) {
        console.error("Error fetching province:", error);
      }
    }
    fetchProvince();
  }, [provinceId]);
  // console.log("province", province);

  useEffect(() => {
    async function fetchCity() {
      try {
        const { data } = await fetchData(`api/user/city/${cityId}`, "GET", {
          cache: "no-store",
        });

        setCity(data.name);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    }
    fetchCity();
  }, [cityId]);
  // console.log("city", city);

  const calculateSubTotal = (cartProduct) => {
    let total = 0;

    cartProduct.forEach((item) => {
      total += item.price * item.quantity;
    });

    setSubTotal(total);
  };

  const handleShippingOptionChange = (selectedOption) => {
    setSelectedShippingOption(selectedOption.toLowerCase());
  };

  const courier = selectedShippingOption;

  useEffect(() => {
    async function fetchShipping() {
      try {
        const response = await fetch(
          `${baseUrl}/api/shipping/${cart}?courier=${courier}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setShippingFee(data.data);
      } catch (error) {
        console.error("Error fetching fee:", error);
      }
    }
    fetchShipping();
  }, [token, cart, courier]);

  const totalBelanja = shippingFee + subTotal;

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    const midtransClientKey = "SB-Mid-client-RGHlGALHJ5YF5uma";
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleOrder = async (cart, subTotal, shippingFee) => {
    try {
      const response = await fetch(`${baseUrl}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cart,
          productPrice: subTotal,
          shippingCost: shippingFee,
        }),
      });
      const data = await response.json();
      setOrderStatusId(data.data.id);
      if (response.ok) {
        toast.success("Order successful!");
      } else {
        toast.error(`${data.message}`);
        return;
      }
      return data.data.id;
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handlePayment = async (
    orderId,
    cart,
    selectedPaymentMethod,
    totalBelanja
  ) => {
    const response = await fetch(`${baseUrl}/api/payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: parseInt(orderId),
        cart_id: parseInt(cart),
        payment_method_id: parseInt(selectedPaymentMethod),
        total_price: parseInt(totalBelanja),
      }),
    });
    const data = await response.json();
    setPaymentId(data.newPayments.id);
    console.log("data payment", data);
    console.log("paymentId", paymentId);
    if (response.ok) {
      toast.success("Payment successful!");
    } else {
      toast.error(`${data.message}`);
      return;
    }
    const payment = parseInt(selectedPaymentMethod);
    if (payment == 2) {
      return router.push(`/shipping_fee/banktransfer/${data.newPayments.id}`);
    }
    setTokenMidtrans(data.token);
    console.log("token midtrans", tokenMidtrans);

    router.refresh();
  };

  // const handlePayment = async (
  //   orderId,
  //   cart,
  //   selectedPaymentMethod,
  //   totalBelanja
  // ) => {
  //   const response = await fetch(`${baseUrl}/api/payment/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       order_id: parseInt(orderId),
  //       cart_id: parseInt(cart),
  //       payment_method_id: parseInt(selectedPaymentMethod),
  //       total_price: parseInt(totalBelanja),
  //     }),
  //   });
  //   const data = await response.json();
  //   // console.log("paymentId 1", paymentId);
  //   setPaymentId(data.newPayments.id);
  //   // console.log("paymentId 2", paymentId);
  //   console.log("data payment", data);
  //   if (response.ok) {
  //     toast.success("Payment successful!");
  //   } else {
  //     toast.error(`${data.message}`);
  //     return;
  //   }
  //   console.log("paymentId 3", paymentId);
  //   const payment = parseInt(selectedPaymentMethod);
  //   if (payment == 2) {
  //     return router.push(`/shipping_fee/banktransfer/${paymentId}`);
  //   }
  //   setTokenMidtrans(data.token);
  //   console.log("token midtrans", tokenMidtrans);

  //   router.refresh();
  //   // router.push("/shipping_fee");
  // };
  // console.log("paymentid 4", paymentId);

  useEffect(() => {
    if (tokenMidtrans) {
      window.snap.pay(tokenMidtrans, {
        onSuccess: async (result) => {
          // status payment
          const responsePayment = await fetch(
            `${baseUrl}/api/payment/${paymentId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "accepted",
              }),
            }
          );
          const dataPayment = await responsePayment.json();
          toast.success("update payment status successful");
          // status order
          const responseOrderStatus = await fetch(
            `${baseUrl}/api/order-status/${orderStatusId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "Process",
              }),
            }
          );
          const dataOrderStatus = await responseOrderStatus.json();
          toast.success("update order status successful");
          // reset cart
          const responseResetCart = await fetch(`${baseUrl}/api/cart/reset`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const dataResetCart = await responseResetCart.json();
          toast.success("reset cart successful");
          // send email
          const responseSendEmail = await fetch(`${baseUrl}/api/sendEmail/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to_name: username,
              from_name: "First Step Shop",
              subject: "Konfirmasi Pengiriman First Step Shop",
              message: "",
              to_email: email,
            }),
          });
          const dataSendEmail = await responseSendEmail.json();
          toast.success("send email successful");
          setTokenMidtrans("");
        },
        onPending: async (result) => {
          // const response = await fetch(`${baseUrl}/api/payment/${paymentId}`, {
          //   method: "PUT",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     status: "waiting",
          //   }),
          // });
          // const data = await response.json();
          toast.info("payment pending", JSON.stringify(result));
          setTokenMidtrans("");
        },
        onError: async (result) => {
          // const response = await fetch(`${baseUrl}/api/payment/${paymentId}`, {
          //   method: "PUT",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     status: "rejected",
          //   }),
          // });
          // const data = await response.json();
          toast.error("payment ", JSON.stringify(error));
          setTokenMidtrans("");
        },
        onClose: () => {
          toast.warn("You have not completed the payment");
          setTokenMidtrans("");
        },
      });
    }
  }, [tokenMidtrans, paymentId, orderStatusId, username, email]);

  return (
    <div>
      <Title title="Check Out" />
      <div className="flex flex-row gap-0 mx-20">
        <div className="basis-3/4 mx-5">
          <div className="Address">
            <p className="font-semibold mb-5">Address</p>
            <p>
              {addressUser.address} {city} {province}
            </p>
            <p>Postal Code : {addressUser.postal_code}</p>
            <p>Phone : {addressUser.phone}</p>
          </div>
          <div className="divider" />
          <div className="produk">
            <p className="font-semibold">Order Details</p>

            {cartProduct.length > 0 &&
              cartProduct.map((cartP) => (
                <div className="flex flex-row items-center ">
                  <div className="avatar w-20 h-20">
                    <Image
                      fill
                      src={cartP.product.product_detail[0].photo}
                      alt={cartP.product.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="font-bold">{cartP.product.name}</div>
                    <p>{cartP.product.product_detail[0].color}</p>
                    <p>
                      {cartP.quantity} x Rp{" "}
                      {cartP.price.toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="divider" />
          <Select
            title="Shipping Method"
            disableSelected="Choose Shipping"
            options={["Jne", "Tiki", "POS"]}
            onChange={handleShippingOptionChange}
          />
          <div className="divider" />
          <p className="font-semibold mb-5">Payment Method</p>
          <select
            className="select select-primary w-full max-w-full mb-2"
            name="paymentMethod"
            id="paymentMethod"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            <option disabled selected>
              Choose Payment Method
            </option>
            {paymentMethod.map((payment) => (
              <option key={payment.id} value={payment.id}>
                {payment.value}
              </option>
            ))}
          </select>
          <div className="mb-10" />
        </div>
        <div className="basis-1/4">
          <div className="flex justify-center p-6 mx-6 ">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-3">Shopping Summary</h2>
                <div className="flow-root mb-3">
                  <div>
                    <div className="flow-root">
                      <p className="float-left">Price</p>
                      <p className="float-right">
                        Rp{" "}
                        {subTotal.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                    <div className="border-b ">
                      <div className="flow-root">
                        <p className="float-left">Shipping Price</p>
                        <p className="float-right">
                          {shippingFee !== undefined && shippingFee !== 0
                            ? shippingFee.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="float-left">Shopping Price</p>
                      <p className="float-right">
                        Rp{" "}
                        {totalBelanja.toLocaleString("id-ID", {
                          styles: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button
                    onClick={async () => {
                      const orderId = await handleOrder(
                        cart,
                        subTotal,
                        shippingFee
                      );
                      handlePayment(
                        orderId,
                        cart,
                        selectedPaymentMethod,
                        totalBelanja
                      );
                    }}
                    className="btn btn-primary text-white"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
