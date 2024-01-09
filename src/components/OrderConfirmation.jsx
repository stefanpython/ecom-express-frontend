import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  const [orderID, setOrderID] = useState("#412341236");
  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white p-8 rounded shadow-custom w-full sm:w-96">
          <h1 className="font-bold text-2xl">Thank you for your order.</h1>
          <p>
            Order <span className="font-bold">{orderID}</span> is complete.
          </p>
          <br />
          <p>A confirmation email will be sent to you shortly.</p>

          <br />
          <div className="flex items-center justify-between">
            <button className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
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
