import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const OrderDetails = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [cookies, setCookies] = useCookies(["token"]);

  const location = useLocation();
  const orderNumber = location.pathname.split("/").pop();

  const navigate = useNavigate();

  // Function to get order details
  const handleOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/order/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const orderDetails = await response.json();
      setOrderItems(orderDetails.order);
    } catch (error) {
      console.error("Error searching for order:", error.message);
    }
  };

  useEffect(() => {
    handleOrderDetails(orderNumber);
  }, []);

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

  // Function to cancel order
  const handleCancelOrder = async (orderId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!isConfirmed) {
      // User canceled the action
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/delete_order/${orderId}`,
        {
          method: "DELETE",
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
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className=" flex justify-end text-right">
            <button
              className="text-blue-500 hover:bg-slate-100 p-1 rounded-md"
              onClick={() => navigate(`/dashboard?selectedTab=orders`)}
            >
              Back to orders
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order ID</h3>
              <p className="text-gray-700">{orderItems?._id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Date</h3>
              <p className="text-gray-700">
                {orderItems &&
                  orderItems.createdAt &&
                  formatCreatedAtDate(orderItems.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Items</h3>
              <ul className="list-none flex flex-col">
                {orderItems?.items &&
                  orderItems.items.map((item) => (
                    <Link to={`/products/${item.product._id}`}>
                      <li
                        key={item._id}
                        className="mb-2 flex items-center hover:bg-gray-100 p-1 rounded-lg"
                      >
                        <img
                          src={`http://localhost:3000/images/${item.product.image}`}
                          alt=""
                          className="w-8 h-8 mr-2"
                        />
                        <span className="font-semibold mr-8">
                          {item.product.name}
                        </span>
                        <br />
                        <br />
                        <span className="text-gray-500 ml-auto">
                          <span className="mr-2">{item.quantity}</span> x
                          <span className="ml-2">
                            {" "}
                            ${Math.round(item.product.price)}
                          </span>
                        </span>
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className="text-gray-700">- {orderItems?.status} - </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Quantity</h3>
              <p className="text-gray-700">
                {orderItems?.items &&
                  orderItems?.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Price</h3>
              <p className="text-gray-700">
                $
                {Math.round(
                  orderItems?.items &&
                    orderItems?.items.reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )
                )}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                handleCancelOrder(orderItems?._id);
                navigate(`/dashboard?selectedTab=orders`);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
