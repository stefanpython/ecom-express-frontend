import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const Address = ({ userInfo }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [addressLine, setAddressLine] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [refreshAddress, setRefreshAddress] = useState(false);

  const [cookies, setCookies] = useCookies(["token"]);

  // Retrieve user addresses
  const handleAddressDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/addresses/${userInfo.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response failed", errorData.message);
        return;
      }

      const userAddresses = await response.json();
      setAddresses(userAddresses.addresses);

      console.log("Success fetching user address list", userAddresses);
    } catch (error) {
      console.error("Failed to fetch address list", error);
    }
  };

  useEffect(() => {
    handleAddressDetails();
  }, [refreshAddress]);

  const handleAddressLineChange = (e) => {
    setAddressLine(e.target.value);
  };

  const handlePostalZipChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          addressLine,
          postalCode,
          phone,
        }),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response failed", errorData.message);
        return;
      }

      setRefreshAddress(!refreshAddress);
      // window.alert("Address added successfully.");

      handleCancel();

      console.log("Added address successful");
    } catch (error) {
      console.error("Adding an address failed", error);
    }
  };

  const handleCancel = () => {
    setAddressLine("");
    setPostalCode("");
    setPhone("");
    setShowForm(false);
  };

  return (
    <div>
      <h1 className="text-left font-medium">Addresses</h1>

      <hr />
      <br />
      {showForm ? (
        <>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="addressLine"
              >
                Address Line
              </label>
              <input
                className="border border-gray-300 rounded w-full md:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="addressLine"
                type="text"
                placeholder="Enter your address"
                value={addressLine}
                onChange={handleAddressLineChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="postalCode"
              >
                Postal/Zip Code
              </label>
              <input
                className="border border-gray-300 rounded w-full md:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="postalCode"
                type="text"
                placeholder="Enter your postal/zip code"
                value={postalCode}
                onChange={handlePostalZipChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="border border-gray-300 rounded w-full md:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Save Address
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red ml-2"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </form>
        </>
      ) : (
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
          onClick={() => setShowForm(true)}
        >
          Add
        </button>
      )}

      <br />
      <br />
      <hr />
      <br />

      <div className="overflow-y-auto max-h-[510px]">
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <div key={index} className="container">
              <p>{`Address Line: ${address.addressLine}`}</p>
              <p>{`Postal/Zip Code: ${address.postalCode}`}</p>
              <p>{`Phone: ${address.phone}`}</p>
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <p>No address found</p>
        )}
      </div>
    </div>
  );
};

export default Address;
