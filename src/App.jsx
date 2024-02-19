import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import Shop from "./components/Shop";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderDetails from "./components/OrderDetails";
import ProductDetails from "./components/ProductDetails";
import AddressDetails from "./components/dashboard/AddressDetails";
import Admin from "./components/Admin";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import EditForm from "./components/admin/EditForm";

// Footer imports
import About from "./components/footer/About";
import Contact from "./components/footer/Contact";
import Processing from "./components/footer/Processing";
import SellWithUs from "./components/footer/SellWithUs";
import Shipping from "./components/footer/Shipping";
import Terms from "./components/footer/Terms";

function PrivateRoute({ element, authenticated, isAdmin }) {
  return authenticated && isAdmin ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: "/admin" }} replace />
  );
}

function App() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const [refreshUser, setRefreshUser] = useState(true);
  const [refreshLogin, setRefreshLogin] = useState(true);
  const [refreshSearch, setRefreshSearch] = useState(false);

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
  const getUserDetails = async (userId) => {
    try {
      if (!userId) {
        console.error("userId is undefined. Skipping GET request.");
        return;
      }

      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

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

      const userDetails = await response.json();
      // console.log("User Details:", userDetails);

      setIsAdmin(userDetails.user.isAdmin);
      setFirstName(userDetails.user.firstName);
      setLastName(userDetails.user.lastName);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getUserDetails(userInfo?.userId);
  }, [refreshUser, refreshLogin]);

  // Handle Add product to cart button
  const handleAddToCart = async (productId, quantity) => {
    try {
      const url = cookies.token
        ? "http://localhost:3000/add_cart_auth"
        : "http://localhost:3000/add_cart_guest";

      const headers = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if cookies.token is not empty
      if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
      }

      const addToCartResponse = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          product: productId,
          quantity: parseInt(quantity),
        }),
      });

      if (!addToCartResponse.ok) {
        const errorData = await addToCartResponse.json();
        throw new Error(errorData.message);
      }

      const cartData = await addToCartResponse.json();
      console.log(cartData.message);

      setRefreshLogin(!refreshLogin);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <Navbar
          firstName={firstName}
          lastName={lastName}
          refreshLogin={refreshLogin}
          setRefreshLogin={setRefreshLogin}
          refreshSearch={refreshSearch}
          setRefreshSearch={setRefreshSearch}
          setIsAdmin={setIsAdmin}
          isAdmin={isAdmin}
          userInfo={userInfo}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={
              <Login
                refreshLogin={refreshLogin}
                setRefreshLogin={setRefreshLogin}
                isAdmin={isAdmin}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                refreshUser={refreshUser}
                setRefreshUser={setRefreshUser}
                userInfo={userInfo}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                refreshLogin={refreshLogin}
                setRefreshLogin={setRefreshLogin}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/order" element={<OrderConfirmation />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route
            path="/products/:productId"
            element={
              <ProductDetails
                refreshLogin={refreshLogin}
                setRefreshLogin={setRefreshLogin}
                refreshSearch={refreshSearch}
                handleAddToCart={handleAddToCart}
              />
            }
          />
          <Route path="/address/:addressId" element={<AddressDetails />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute
                element={<Admin />}
                authenticated={Boolean(cookies.token)}
                isAdmin={isAdmin}
              />
            }
          />

          <Route path="/update_product/:productId" element={<EditForm />} />

          {/* Footer routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/sell" element={<SellWithUs />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
