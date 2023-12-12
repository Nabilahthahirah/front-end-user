import React from 'react';
import Image from "next/image";
import Link from "next/link";
import logo from "@/components/assets/logo.png";

const imageProfile = ({username}) => {
  return (
    <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        {/* card */}
      <div className="w-full md:w-1/2 max-w-sm border border-gray-200 rounded-lg shadow">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={username} alt={`${username} image`} /> */}
          <div className="mb-3 rounded-full shadow-lg rounded-full">
            <Image
              alt=""
              src={logo}
              width={24}
              height={24}
              className=""
            />
          </div>
          <h5 className="mb-1 text-xl font-medium text-dark">{username}</h5>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Upload
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default imageProfile