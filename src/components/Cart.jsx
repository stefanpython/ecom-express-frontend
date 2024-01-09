const Cart = ({ onClose, isCartOpen }) => {
  // Dummy data for items in the cart
  const cartItems = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 15 },
    { id: 3, name: "Product 3", price: 20 },
  ];

  // Dummy function to handle placing an order
  const handlePlaceOrder = () => {
    // Add your logic to place the order
    console.log("Placing order...");
  };

  return (
    <div
      className={`cart-container fixed top-0 right-0 h-full w-full sm:w-1/3 bg-white shadow-md  ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      } duration-700 ease-in-out z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-bold">Shopping Cart</h1>
        <button
          onClick={() => {
            onClose();
          }}
        >
          <span className="text-2xl">&times;</span>
        </button>
      </div>

      <div className="p-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <p>Total:</p>
        <p>${cartItems.reduce((acc, item) => acc + item.price, 0)}</p>
      </div>

      <div className="p-4">
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
