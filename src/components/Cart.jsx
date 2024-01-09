import { Link } from "react-router-dom";

const Cart = ({ onClose, isCartOpen }) => {
  // Dummy data for items in the cart
  const cartItems = [
    { id: 1, name: "Product 1", price: 10, quantity: 2, image: "product1.jpg" },
    { id: 2, name: "Product 2", price: 15, quantity: 1, image: "product2.jpg" },
    { id: 3, name: "Product 3", price: 20, quantity: 3, image: "product3.jpg" },
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
          <div key={item.id} className="flex flex-col mb-2">
            <div className="flex items-center mb-2 justify-between">
              <div className="flex items-center">
                <img src={item.image} alt="" className="w-10 h-10 mr-2" />
                <p>{item.name}</p>
              </div>

              <button onClick={() => console.log("Item deleted")}>
                <img className="w-6 h-6" src="./bin.png" alt="recicle-bin" />
              </button>
            </div>

            <div className="flex flex-col">
              <div className="flex mr-4 justify-between">
                <p className="mr-2">Quantity:</p>
                <p>{item.quantity}</p>
              </div>

              <div className="flex justify-between">
                <p className="mr-2">Price:</p>
                <p>${item.price * item.quantity}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <p>Total:</p>
        <p>
          $
          {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        </p>
      </div>

      <div className="p-4">
        <Link to="/order">
          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={() => {
              handlePlaceOrder;
              onClose();
            }}
          >
            Place Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
