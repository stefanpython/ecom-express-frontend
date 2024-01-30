import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = ({ firstName, refreshLogin }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const isUserLoggedIn = cookies.token ? true : false;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [refreshCart, setRefrehCart] = useState(false);

  const navigate = useNavigate();

  // Toggle user dropdown
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      // Send a request to the server to invalidate the session or token
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (response.ok) {
        // Clear the token from client-side storage
        removeCookie("token", { path: "/" });
        setIsDropdownOpen(false);

        setCartItems([]);

        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
    setIsDropdownOpen(false);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Add event listener when the component mounts
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  // Grab cart items
  const getCartDetails = async () => {
    try {
      const url = cookies.token
        ? `http://localhost:3000/cart_user`
        : `http://localhost:3000/cart_guest`;

      const headers = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if cookies.token is not empty
      if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
      }

      const response = await fetch(url, {
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const cartDetails = await response.json();

      setCartItems(cartDetails.cart.items);
    } catch (error) {
      console.error("Failed to get cart details:", error);
    }
  };

  useEffect(() => {
    getCartDetails();
  }, [refreshCart, refreshLogin]);

  return (
    <nav className="p-3 shadow bg-slate-100">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-4 justify-center flex-grow mr-4 sm:justify-start sm:mr-0 sm:flex-grow-0">
          <div className="text-black text-lg font-bold">
            <Link to="/">Ecom Express</Link>
          </div>
        </div>

        <div className="flex space-x-4 flex-grow justify-center pt-3 sm:pt-0 ">
          <input
            type="text"
            placeholder="Search products"
            className="bg-white-700 text-white p-2 rounded items-center w-auto md:w-96"
          />
        </div>
        <div></div>
        <div className="flex space-x-2 flex-grow justify-between pt-5 sm:pt-0 sm:flex-grow-0">
          <div className="flex space-x-4 pl-1 sm:pl-0">
            <button
              className="text-black cursor-pointer"
              onClick={handleCartToggle}
            >
              <img className="w-6 h-6" src="./cart.png" alt="cart" />
              {cartItems.length > 0 && (
                <span className="bg-red-500 text-white rounded-full w-5 h-5 absolute -mt-8 ml-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex justify-end flex-grow pl-2">
            <Link to="/shop" className="text-black cursor-pointer">
              Shop
            </Link>
          </div>

          <div className="relative dropdown-container">
            <button
              onClick={handleDropdownToggle}
              className="text-black cursor-pointer"
            >
              Welcome, {isUserLoggedIn ? `${firstName}` : "Guest"}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white p-4 rounded shadow">
                {isUserLoggedIn ? (
                  <>
                    <Link to="/dashboard">Dashboard</Link>
                    <div className="cursor-pointer" onClick={handleSignOut}>
                      Sign Out
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-left">
                      <Link to="/login"> Login</Link>
                    </div>
                    <div>
                      <Link to="/signup">Sign Up</Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <Cart
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          isCartOpen={isCartOpen}
          setRefrehCart={setRefrehCart}
          refreshCart={refreshCart}
        />
      </div>
    </nav>
  );
};

export default Navbar;
