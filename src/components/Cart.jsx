import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

const Cart = ({
  onClose,
  isCartOpen,
  cartItems,
  refreshCart,
  setRefrehCart,
}) => {
  const [cookies, setCookies] = useCookies(["token"]);
  const cartRef = useRef(null);

  // Function to handle placing an order
  const handlePlaceOrder = async () => {
    try {
      const response = await fetch("http://localhost:3000/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          totalAmount: cartItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          ),
          status: "Pending",
        }),
      });

      // Store order details in local storage
      const orderDetails = {
        items: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalAmount: cartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        ),
        status: "Pending",
      };

      localStorage.setItem("pendingOrder", JSON.stringify(orderDetails));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      await clearCart();
      onClose();

      console.log("Order placed successfully!");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  // Function to handle clearing the entire cart
  const clearCart = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if cookies.token is not empty
      if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
      }

      const response = await fetch("http://localhost:3000/clear_cart", {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // After clearing the cart, you can refresh the cart
      setRefrehCart(!refreshCart);
    } catch (error) {
      console.error("Failed to clear the cart:", error);
    }
  };

  // Close the cart when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, onClose]);

  // Function to handle removal of an item
  const handleRemoveItem = async (productId) => {
    try {
      const url = cookies.token
        ? `http://localhost:3000/cart/remove_auth/${productId}`
        : `http://localhost:3000/cart/remove_guest/${productId}`;

      const headers = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if cookies.token is not empty
      if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
      }

      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      window.alert("Item deleted successfully");

      setRefrehCart(!refreshCart);
    } catch (error) {
      console.error("Failed to remove item from the cart:", error);
    }
  };

  return (
    <div
      ref={cartRef}
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
          <span className="text-4xl">&times;</span>
        </button>
      </div>

      <div className="p-4 overflow-y-auto max-h-[750px]">
        {cartItems &&
          cartItems.map((item) => (
            <div key={item._id} className="flex flex-col mb-2">
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center">
                  <img
                    src={`http://localhost:3000/images/${item.product.image}`}
                    alt=""
                    className="w-10 h-10 mr-2"
                  />
                  <p>{item.product.name}</p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  data-testid="remove-button"
                >
                  <img className="w-6 h-6" src="./bin.png" alt="recycle-bin" />
                </button>
              </div>

              <div className="flex flex-col">
                <div className="flex mr-4 justify-between">
                  <p className="mr-2">Quantity:</p>
                  <p>{item.quantity}</p>
                </div>

                <div className="flex justify-between">
                  <p className="mr-2">Price:</p>
                  <p>${parseInt(item.product.price * item.quantity)}</p>
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
          {cartItems &&
            parseInt(
              cartItems.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )
            )}
        </p>
      </div>

      <div className="p-4">
        {cartItems && cartItems.length > 0 && (
          <Link to={cookies.token ? "/order" : "/login"}>
            <button
              className="w-full bg-blue-500 text-white p-2 rounded"
              onClick={() => {
                handlePlaceOrder();
                onClose();
              }}
            >
              Place Order
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
