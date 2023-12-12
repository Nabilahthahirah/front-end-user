// src/app/address/components/EditDeleteAddress.jsx
"use client"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "@/lib/constant";
import { useAuthStore } from "@/zustand";

export default function EditDeleteAddress({ address, refreshAddresses }) {
  const { token } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState(address.address);
  const [editedCity, setEditedCity] = useState(String(address.city.id));
  const [editedProvince, setEditedProvince] = useState(
    String(address.province.id)
  );
  const [editedPostalCode, setEditedPostalCode] = useState(address.postal_code);
  const [editedPhone, setEditedPhone] = useState(address.phone);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchProvinces();
    fetchCities();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/rajaongkir/provinces`, {
        headers: {
          "cache-control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProvinces(data);
      } else {
        console.error(`Error fetching provinces: ${response.status}`);
        // Handle other error cases if needed
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/rajaongkir/city`, {
        headers: {
          "cache-control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCities(data);
      } else {
        console.error(`Error fetching cities: ${response.status}`);
        // Handle other error cases if needed
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/address/${address.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: editedAddress,
          city_id: parseInt(editedCity),
          province_id: parseInt(editedProvince),
          postal_code: editedPostalCode,
          phone: editedPhone,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message || "Address updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setIsOpen(false);

        // Call refreshAddresses after a successful update
        refreshAddresses();
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
        // Handle other error cases if needed
        toast.error(
          "An error occurred while updating the address",
          // Add other options for toast if needed
        );
      }
    } catch (error) {
      console.error(`Error: ${error.message || "Unknown error"}`);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/address/${address.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok || response.status === 204) {
        // If status is 204, it means deletion was successful, no need to parse the response
        toast.success("Address deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        refreshAddresses();
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
        // Handle other error cases if needed
        const errorResponse = await response.json();
        toast.error(
          errorResponse.message ||
            "An error occurred while deleting the address",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          }
        );
      }
    } catch (error) {
      console.error(`Error: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          className="btn btn-sm btn-outline btn-orange-600 mb-5 sm:btn-md"
          onClick={handleModal}
        >
          Edit/Delete
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-xl font-bold mb-5 text-orange-600">
              Edit/Delete Address
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control w-full space-y-4">
                <label className="label font-bold">Address</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                />
                <label className="label font-bold">Province</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={editedProvince}
                  onChange={(e) => setEditedProvince(e.target.value)}
                >
                  <option value="">Select Province</option>
                  {provinces &&
                    provinces.map((province) => (
                      <option
                        key={province.province_id}
                        value={String(province.province_id)}
                      >
                        {province.province}
                      </option>
                    ))}
                </select>
                <label className="label font-bold">City</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities &&
                    cities
                      .filter((city) => city.province_id === editedProvince)
                      .map((city) => (
                        <option key={city.city_id} value={String(city.city_id)}>
                          {city.city_name}
                        </option>
                      ))}
                </select>

                <label className="label font-bold">Postal Code</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={editedPostalCode}
                  onChange={(e) => setEditedPostalCode(e.target.value)}
                />
                <label className="label font-bold">Phone</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
              </div>
              <div className="modal-action flex justify-center sm:justify-end w-full mt-6">
                <button
                  type="button"
                  className="btn btn-sm sm:btn-md btn-outline btn-orange-600 mr-2"
                  onClick={handleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-sm sm:btn-md btn-orange-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm sm:btn-md btn-outline btn-red-600 ml-2"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
