import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const AddressDetails = () => {
  const [addressLine, setAddressLine] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const { addressId } = useParams();

  const [cookies, setCookies] = useCookies(["token"]);

  const navigate = useNavigate();

  // Grab address details
  const getAddressDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/address/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const addressDetails = await response.json();

      setAddressLine(addressDetails.address.addressLine);
      setPhone(addressDetails.address.phone);
      setPostalCode(addressDetails.address.postalCode);
    } catch (error) {
      console.error("Failed to grab address details", error);
    }
  };

  // Fetch the address details on component mount
  useEffect(() => {
    getAddressDetails(addressId);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/update_address/${addressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({
            addressLine,
            postalCode,
            phone,
          }),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed", errorData.message);
        return;
      }

      window.alert("Name updated successfully.");

      console.log("Update successful");
    } catch (error) {
      console.error("Saving detailes failed", error);
    }
  };

  const handleDelete = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want delete this address?"
    );

    if (!isConfirmed) {
      // User canceled the action
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      navigate(`/dashboard?selectedTab=address`);
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleAddressLine = (e) => {
    setAddressLine(e.target.value);
  };

  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className=" flex justify-end text-right">
            <button
              className="text-blue-500 hover:bg-slate-100 p-1 rounded-md"
              onClick={() => navigate(`/dashboard?selectedTab=address`)}
            >
              Back to orders
            </button>
          </div>

          <br />
          <h2 className="text-2xl font-bold mb-4">Address Details</h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Address Line
              </label>
              <input
                type="text"
                name="addressLine"
                value={addressLine}
                onChange={handleAddressLine}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Postal/Zip Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={postalCode}
                onChange={handlePostalCode}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handlePhone}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex space-x-44">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressDetails;
