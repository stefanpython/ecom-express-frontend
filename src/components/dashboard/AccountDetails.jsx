import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const AccountDetails = () => {
  const [cookies, setCookies] = useCookies(["token"]);

  // Extract user info from token
  const getUserIDFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const { userId, username } = decodedToken;
      return { userId, username };
    } catch (error) {
      console.log("Error decoding token:", error);
      return null;
    }
  };

  const userInfo = cookies.token ? getUserIDFromToken(cookies.token) : null;

  const [firstName, setFirstName] = useState(userInfo.username.split(" ")[0]);
  const [lastName, setLastName] = useState(userInfo.username.split(" ")[1]);

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
  };

  return (
    <div>
      <h1 className="text-left font-medium">Account Details</h1>

      <hr />
      <br />

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
      </form>
    </div>
  );
};

export default AccountDetails;
