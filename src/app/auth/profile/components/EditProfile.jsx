// src/app/profile/components/EditProfile.jsx
"use client"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "@/lib/constant";
import { useAuthStore } from "@/zustand";

export default function EditProfile() {
  const { token } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/user/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // Set the initial values based on the user's profile
        setEditedUsername(userData.data.username);
        setEditedEmail(userData.data.email);
        setEditedPhone(userData.data.phone);
      } else {
        console.error(`Error fetching user profile: ${response.status}`);
        // Handle other error cases if needed
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: editedUsername,
          email: editedEmail,
          phone: editedPhone,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message || "Profile updated successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setIsOpen(false);

        // Refresh user profile data after a successful update
        fetchUserProfile();
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
        // Handle other error cases if needed
        toast.error(
          "An error occurred while updating the profile",
          // Add other options for toast if needed
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
          Edit Profile
        </button>
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box bg-white p-8 rounded-md shadow-md text-center">
            <h3 className="text-xl font-bold mb-5 text-orange-600">
              Edit Profile
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control w-full space-y-4">
                <label className="label font-bold">Username</label>
                <input
                  required
                  type="text"
                  className="input input-sm input-bordered sm:input-md"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                />
                <label className="label font-bold">Email</label>
                <input
                  required
                  type="email"
                  className="input input-sm input-bordered sm:input-md"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
