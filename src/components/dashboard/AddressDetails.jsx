import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AddressDetails = () => {
  const [address, setAddress] = useState({
    addressLine: "",
    postalCode: "",
    phone: "",
  });
  const [cookies, setCookies] = useCookies(["token"]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch the address details on component mount
  useEffect(() => {
    // Fetch address details and set them to the state
    // You can use the same approach you've used in other components
    // Fetch the address based on the address ID from the URL
    // Update the address state with the fetched data
  }, []);

  const handleSave = async () => {
    try {
      // Perform the save/update logic here
      // You can use a fetch request to update the address on the server
      // After successful update, you may want to navigate to another page or refresh the data
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Perform the delete logic here
      // You can use a fetch request to delete the address on the server
      // After successful deletion, you may want to navigate to another page or handle accordingly
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleChange = (e) => {
    // Update the state as the user types
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Address Details</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Address Line
              </label>
              <input
                type="text"
                name="addressLine"
                value={address.addressLine}
                onChange={handleChange}
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
                value={address.postalCode}
                onChange={handleChange}
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
                value={address.phone}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex space-x-44">
              <button
                type="button"
                onClick={handleSave}
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
