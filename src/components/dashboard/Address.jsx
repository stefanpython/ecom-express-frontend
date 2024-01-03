import { useState } from "react";

const Address = () => {
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
    // Add logic to update the user's address details
    console.log("Updated address line:", addressLine);
    console.log("Updated postal/zip code:", postalZip);
    console.log("Updated phone:", phone);
  };

  return (
    <div>
      <h1>Address</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="addressLine"
          >
            Address Line
          </label>
          <input
            className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
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
            className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
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
            className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Address;
