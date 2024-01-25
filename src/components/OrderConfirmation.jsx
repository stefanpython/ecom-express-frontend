import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

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

      // console.log("Orders Details:", orderDetails);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getOrderDetails(userInfo.userId);
  }, []);

  // Navigate to the dashboard with selectedTab set to "orders"
  const handleManageOrdersClick = () => {
    navigate(`/dashboard?selectedTab=orders`);
  };
  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white p-8 rounded shadow-custom w-full sm:w-96">
          <h1 className="font-bold text-2xl">Thank you for your order.</h1>
          <p>
            Order
            <span className="font-bold">
              {orders.length > 0
                ? " " + orders[orders.length - 1]._id + " "
                : "N/A"}
            </span>
            is complete.
          </p>
          <br />
          <p>A confirmation email will be sent to you shortly.</p>

          <br />
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={handleManageOrdersClick}
            >
              Manage orders
            </button>

            <Link to="/shop">
              <button className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
