import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

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
      const response = await fetch(
        `https://ecom-express-backend-production.up.railway.app/user/${userId}/orders`,
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

      // console.log("Orders Details:", orderDetails);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getOrderDetails(userInfo?.userId);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://ecom-express-backend-production.up.railway.app/order/${searchQuery}`,
        {
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

      const orderDetails = await response.json();
      setOrders([orderDetails.order]);
    } catch (error) {
      console.error("Error searching for order:", error.message);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      getOrderDetails();
    }
  }, [searchQuery]);

  // Function to format date
  const formatCreatedAtDate = (dateString) => {
    const options = {
      day: "numeric",
      weekday: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
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
            placeholder="Search for order by ID"
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

      <div className="overflow-y-auto max-h-[510px]">
        {orders && orders.length > 0 ? (
          orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order) => (
              <Link key={order._id} to={`/order/${order._id}`}>
                <div
                  key={order._id}
                  className="mb-4 hover:bg-gray-100 p-2 rounded-md"
                >
                  <p>
                    {`ID:`} <span className="font-bold">{order._id}</span>
                  </p>
                  <p>
                    {`Status:`}{" "}
                    <span className="font-bold">{order.status}</span>
                  </p>
                  <p>
                    {`Date:`}{" "}
                    <span className="font-bold">
                      {formatCreatedAtDate(order.createdAt)}
                    </span>
                  </p>
                  <p>
                    {`Total Amount: `}{" "}
                    <span className="font-bold">{order.totalAmount}</span>
                  </p>

                  <ul>
                    {order.items.map((item) => (
                      <li key={item._id}>
                        Product:{" "}
                        <span className="font-bold">{item.product.name}</span>{" "}
                        Quantity:
                        <span className="font-bold">{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-2" />
                </div>
              </Link>
            ))
        ) : (
          <p>You have no orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
