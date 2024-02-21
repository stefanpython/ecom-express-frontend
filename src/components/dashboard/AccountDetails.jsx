import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const AccountDetails = ({ setRefreshUser, refreshUser }) => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  // Function to fetch user details
  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const userDetails = await response.json();

      setFirstName(userDetails.user.firstName);
      setLastName(userDetails.user.lastName);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getUserDetails(userInfo?.userId);
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/user/update/${userInfo.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
          }),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed", errorData.message);
        return;
      }

      setRefreshUser(!refreshUser);

      window.alert("Name updated successfully.");

      console.log("Update successful");
    } catch (error) {
      console.error("Saving detailes failed", error);
    }
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
