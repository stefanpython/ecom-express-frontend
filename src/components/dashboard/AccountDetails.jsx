import React, { useState } from "react";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update the user's first and last name
    console.log("Updated first name:", firstName);
    console.log("Updated last name:", lastName);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setShowForm(false);
  };

  return (
    <div>
      <h1 className="text-left font-medium">Account Details</h1>

      <hr />
      <br />
      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Save Changes
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red ml-2"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
          onClick={() => setShowForm(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default AccountDetails;
