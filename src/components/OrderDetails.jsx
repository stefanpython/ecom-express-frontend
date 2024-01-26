import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

// // Dummy data for order items
// const orderItems = [
//   {
//     id: 1,
//     name: "Converse All Star",
//     price: 40,
//     quantity: 2,
//     image: "converse.jpg",
//   },
//   {
//     id: 2,
//     name: "Nike Air Max",
//     price: 80,
//     quantity: 1,
//     image: "nike_air_max.jpg",
//   },
//   {
//     id: 3,
//     name: "Adidas Superstar",
//     price: 60,
//     quantity: 3,
//     image: "adidas_superstar.jpg",
//   },
// ];

const OrderDetails = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [cookies, setCookies] = useCookies(["token"]);

  const location = useLocation();
  const orderNumber = location.pathname.split("/").pop();

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

  // Format date
  const formatCreatedAtDate = (dateString) => {
    const options = {
      day: "numeric",
      weekday: "long",
      year: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order ID</h3>
              <p className="text-gray-700">{orderItems._id}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Date</h3>
              <p className="text-gray-700">
                {orderItems.createdAt &&
                  formatCreatedAtDate(orderItems.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Items</h3>
              <ul className="list-none flex flex-col">
                {orderItems.items &&
                  orderItems.items.map((item) => (
                    <li key={item._id} className="mb-2 flex items-center">
                      <img
                        src={item.product.image}
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
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className="text-gray-700">- {orderItems.status} - </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Quantity</h3>
              <p className="text-gray-700">
                {orderItems.items &&
                  orderItems.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Price</h3>
              <p className="text-gray-700">
                $
                {orderItems.items &&
                  orderItems.items.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                  )}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => console.log("Order canceled")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
