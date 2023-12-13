"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/zustand";
import { baseUrl } from "@/lib/constant";
import Link from "next/link";

export default function ProfilePage() {
  const { token, isLoggedIn } = useAuthStore();
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/user/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data); // Menyimpan informasi pengguna ke state
      } else {
        console.error(`Error fetching user profile: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [token, isLoggedIn]);

  return (
    <>
      {/* navbar */}
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <Link
            href="/auth/profile"
            aria-current="page"
            className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
          >
            Profile
          </Link>
        </li>
        <li className="me-2">
          <Link
            href="/auth/address"
            aria-current="page"
            className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
          >
            Alamat
          </Link>
        </li>
        <li className="me-2">
          <a
            href="#"
            className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            Order History
          </a>
        </li>
      </ul>
      {/* Konten profil */}
      <div className="flex flex-col items-center py-5 h-screen bg-gray-100">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-white rounded-md p-6 shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6 text-orange-600">
            User Profile
          </h1>
          {user && (
            <div>
              <div className="mb-4 text-center">
                <label className="block text-lg font-semibold text-orange-600 mb-1">
                  Username:
                </label>
                <p className="text-xl font-medium border rounded-md py-2 px-4">
                  {user.username}
                </p>
              </div>
              <div className="mb-4 text-center">
                <label className="block text-lg font-semibold text-orange-600 mb-1">
                  Email:
                </label>
                <p className="text-xl font-medium border rounded-md py-2 px-4">
                  {user.email}
                </p>
              </div>
              <div className="mb-4 text-center">
                <label className="block text-lg font-semibold text-orange-600 mb-1">
                  Phone:
                </label>
                <p className="text-xl font-medium border rounded-md py-2 px-4">
                  {user.phone}
                </p>
              </div>
              {/* Tambahkan field lain jika diperlukan */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
