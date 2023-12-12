// AddAddress.jsx
"use client";
import { useState, useEffect } from "react";
import { baseUrl } from "@/lib/constant";
import { useAuthStore } from "@/zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddAddress({ refreshAddresses }) {
  const { token } = useAuthStore();

  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchProvinces();
  }, [token]);

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/rajaongkir/provinces`, {
        method: "GET",
        headers: {
          "cache-control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setProvinces(data);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
      toast.error("Error fetching provinces", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const fetchCities = async (selectedProvinceId) => {
    try {
      const response = await fetch(`${baseUrl}/api/rajaongkir/city`, {
        method: "GET",
        headers: {
          "cache-control": "no-store",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        const filteredCities = data.filter(
          (city) => city.province_id === selectedProvinceId
        );
        setCities(filteredCities);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error fetching cities", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const handleProvinceChange = (selectedProvinceId) => {
    setProvinceId(selectedProvinceId);
    fetchCities(selectedProvinceId);
    setCityId(""); // Reset selected city
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
          city_id: parseInt(cityId),
          province_id: parseInt(provinceId),
          postal_code: postalCode,
          phone,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        toast.success(responseData.message || "Address created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
  
        setAddress("");
        setCityId("");
        setProvinceId("");
        setPostalCode("");
        setPhone("");
  
        setIsOpen(false);
        refreshAddresses();
      } else {
        console.error("Error response data:", responseData);
        toast.error(responseData.message || "Unknown error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error.message || "Unknown error");
      toast.error(`Error: ${error.message || "Unknown error"}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center sm:justify-end">
        <button className="btn btn-sm btn-outline btn-orange-600 mb-5 sm:btn-md" onClick={handleModal}>
          Add New Address
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white p-8 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-5 text-orange-600">Add New Address</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full space-y-4">
                <label className="label font-bold">Address</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label className="label font-bold">Province</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={provinceId}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.province_id} value={String(province.province_id)}>
                      {province.province}
                    </option>
                  ))}
                </select>
                <label className="label font-bold">City</label>
                <select
                  required
                  className="input input-sm input-bordered sm:input-md"
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
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
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <label className="label font-bold">Phone</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="modal-action flex justify-end mt-6">
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}