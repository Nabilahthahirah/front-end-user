"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import AddAddress from './components/AddAddress';
import EditDeleteAddress from './components/EditDeleteAddress';
import { baseUrl } from "@/lib/constant";
import { useAuthStore } from "@/zustand";
import "flowbite";

export default function AddressPage() {
  const { token, isLoggedIn } = useAuthStore();
  const [addresses, setAddresses] = useState([]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error(`Error fetching addresses: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const refreshAddresses = () => {
    fetchAddresses();
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchAddresses();
    }
  }, [token, isLoggedIn]);

  return (
    <>
      {/* navbar */}
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <Link href="/auth/profile" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Profile</Link>
        </li>
        <li className="me-2">
          <Link href="/auth/address" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Alamat</Link>
        </li>
        <li className="me-2">
          <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Order History</a>
        </li>
      </ul>
      <div className="flex flex-col items-center py-5 h-screen">
        <div className="w-3/4">
          <h1 className="text-4xl font-bold text-center mb-10 text-orange-600">Address List</h1>
          <div className="mb-5">
            <AddAddress refreshAddresses={refreshAddresses} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {addresses.map((address, index) => (
              <div key={address.id} className="bg-white border rounded p-4 hover:bg-orange-400 transition-all">
                <p className="text-xl font-semibold mb-2">{address.address}</p>
                <p className="mb-1">{`City: ${address.city.name}`}</p>
                <p className="mb-1">{`Province: ${address.province.name}`}</p>
                <p className="mb-1">{`Postal Code: ${address.postal_code}`}</p>
                <p className="mb-1">{`Phone: ${address.phone}`}</p>
                <div className="flex justify-end mt-4">
                  <EditDeleteAddress address={address} refreshAddresses={refreshAddresses} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}