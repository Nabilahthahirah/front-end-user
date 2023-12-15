'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/zustand';
import { useRouter } from 'next/navigation';


const FileUpload = ({params}) => {
  const paymentId = params.id;
  console.log(params.id);
  const { token, setToken, isLoggedIn, login, logout } = useAuthStore();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const upload = async () => {

    if (!isLoggedIn) {
      router.push("/auth/login");
      return
    }
    const formData = new FormData();
    formData.append('fileUpload', selectedFile);

    try {
      const response = await fetch(`${baseUrl}/api/payment/upload/${paymentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response?.json();
      if (response.ok) {
        toast.success(data.message);
        router.refresh();
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  return (
    <>
    <div className='items-center justify-center h-screen'>
      <div className='m-10'>
        <h1 className='text-center font-bold text-xl'>Proof Of Payment</h1>
      </div>
      <div className="m-10 max-w-md mx-auto p-6 bg-white border rounded-md shadow-md">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer"
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Selected"
              width={500}
              height={500}
              className="w-32 h-32 object-cover mb-2 rounded-md"
            />
          ) : (
            <div className="flex flex-col items-center">
              <svg
                className="w-10 h-10 text-gray-400 mb-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              <p className="text-sm text-gray-500">Drag and drop or click to select a file</p>
            </div>
          )}
        </label>
        {selectedFile && (
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-700">{selectedFile.name}</p>
          </div>
        )}
        <div className='text-center'>
          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800" onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default FileUpload;
