import React, { useState } from "react";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [addressLine, setAddressLine] = useState("");
  const [postalZip, setPostalZip] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddressLineChange = (e) => {
    setAddressLine(e.target.value);
  };

  const handlePostalZipChange = (e) => {
    setPostalZip(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = {
      addressLine,
      postalZip,
      phone,
    };

    setAddresses([...addresses, newAddress]);
    setAddressLine("");
    setPostalZip("");
    setPhone("");
    setShowForm(false);
  };

  const handleCancel = () => {
    setAddressLine("");
    setPostalZip("");
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
                htmlFor="postalZip"
              >
                Postal/Zip Code
              </label>
              <input
                className="border border-gray-300 rounded w-full md:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="postalZip"
                type="text"
                placeholder="Enter your postal/zip code"
                value={postalZip}
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

      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <div key={index}>
            <p>{`Address Line: ${address.addressLine}`}</p>
            <p>{`Postal/Zip Code: ${address.postalZip}`}</p>
            <p>{`Phone: ${address.phone}`}</p>
            <hr className="my-4" />
          </div>
        ))
      ) : (
        <p>No address found</p>
      )}
    </div>
  );
};

export default Address;
