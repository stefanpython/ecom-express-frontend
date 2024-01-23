import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import OrderDetails from "../OrderDetails";

const Orders = ({}) => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);

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
  const getOrderDetails = async (userId) => {
    try {
      if (!userId) {
        console.error("userId is undefined. Skipping GET request.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/user/${userId}/orders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      // Check if response is unauthorized
      if (response.status === 401) {
        // Handle unauthorized error here (e.g., redirect to login)
        console.error("Unauthorized. Redirecting to login...");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const orderDetails = await response.json();
      setOrders(orderDetails.userOrders);

      console.log("Orders Details:", orderDetails);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getOrderDetails(userInfo.userId);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling search (if needed)
  };

  return (
    <div>
      <h1 className="text-left font-semibold">Orders</h1>

      <hr />
      <br />
      <form onSubmit={handleSearchSubmit}>
        <div className="mb-4 flex">
          <input
            className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="searchQuery"
            type="text"
            placeholder="Search for orders"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Search
          </button>
        </div>
      </form>

      <hr />
      <br />

      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="mb-4">
            <p>{`Status: ${order.status}`}</p>
            <p>{`Total Amount: ${order.totalAmount}`}</p>
            <p>{`Items:`}</p>
            <ul>
              {order.items.map((item) => (
                <li
                  key={item._id}
                >{`Product: ${item.product.name}, Quantity: ${item.quantity}`}</li>
              ))}
            </ul>
            <hr className="my-2" />
          </div>
        ))
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
