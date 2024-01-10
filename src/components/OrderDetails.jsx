const OrderDetails = () => {
  // Dummy data for order items
  const orderItems = [
    {
      id: 1,
      name: "Converse All Star",
      price: 40,
      quantity: 2,
      image: "converse.jpg",
    },
    {
      id: 2,
      name: "Nike Air Max",
      price: 80,
      quantity: 1,
      image: "nike_air_max.jpg",
    },
    {
      id: 3,
      name: "Adidas Superstar",
      price: 60,
      quantity: 3,
      image: "adidas_superstar.jpg",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Order ID</h3>
              <p className="text-gray-700">659d76f26251000000fla4e49</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Date</h3>
              <p className="text-gray-700">Tuesday, Jan 9, 2024</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Items</h3>
              <ul className="list-none flex flex-col">
                {orderItems.map((item) => (
                  <li key={item.id} className="mb-2 flex items-center">
                    <img src={item.image} alt="" className="w-8 h-8 mr-2" />
                    <span className="font-semibold mr-8">{item.name}</span>
                    <br />
                    <br />
                    <span className="text-gray-500 ml-auto">
                      <span className="mr-2">{item.quantity}</span> x
                      <span className="ml-2"> ${item.price}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Status</h3>
              <p className="text-gray-700">1 - Not processed</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Quantity</h3>
              <p className="text-gray-700">6</p>{" "}
              {/* Total quantity of all items */}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Price</h3>
              <p className="text-gray-700">
                $
                {orderItems.reduce(
                  (acc, item) => acc + item.price * item.quantity,
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
