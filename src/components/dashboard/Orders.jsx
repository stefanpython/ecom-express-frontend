import React, { useState } from "react";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add logic for handling search (if needed)
  };

  const filteredOrders = orders.filter((order) =>
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order.id} className="mb-4">
            <p>{`Product: ${order.product}`}</p>
            <p>{`Quantity: ${order.quantity}`}</p>
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
