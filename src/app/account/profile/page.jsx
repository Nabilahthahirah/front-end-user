'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Header from '@/components/account/header';
import ImageProfile from '@/components/account/profile/imageProfile';
import fetchWithTokenClient from '@/lib/fetchWithTokenClient';
import { useUserStore } from '@/zustand';
import Loading from '@/app/loading'

// ... (import statements)

export default function UpdateProfil() {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      // Implement your logic to fetch user data
      // For example, if you have a function fetchUserById, you can use it like this:
      // const userData = await fetchUserById(userId);
      // setUser(userData);
    };

    fetchUser();
  }, [setUser]);

  console.log(`user: ${JSON.stringify(user)}`);

  if (!user || user.length === 0) {
    return <Loading />;
  }

  // Destructure user properties from the first item in the array
  const { id, username, email, phone } = user[0];

  console.log(`username: ${username}`)

  return (
    <div className='w-full px-4 pt-6 mb-8'>
      <Header />
      <div className='divider'></div>
      <div className='flex'>
        <ImageProfile />

        {/* Tab */}
        <div className="relative overflow-x-auto">
          <table className="w-full md:w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Profile
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b">
                <th scope="row" className="px-6 py-4 font-medium text-dark whitespace-nowrap">
                  Username : {username}
                </th>
                <td className="px-6 py-4"></td>
              </tr>
              <tr className=" border-b">
                <th scope="row" className="px-6 py-4 font-medium text-dark whitespace-nowrap">
                  Email : {email}
                </th>
                <td className="px-6 py-4"></td>
              </tr>
              <tr className=" ">
                <th scope="row" className="px-6 py-4 font-medium text-dark whitespace-nowrap">
                  Phone Number : {phone}
                </th>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

