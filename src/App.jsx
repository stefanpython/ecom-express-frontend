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
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

function App() {
  const [cookies, setCookies] = useCookies(["token"]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [refreshUser, setRefreshUser] = useState(true);

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
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const userDetails = await response.json();
      // console.log("User Details:", userDetails);

      setFirstName(userDetails.user.firstName);
      setLastName(userDetails.user.lastName);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    getUserDetails(userInfo.userId);
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <Navbar
          firstName={firstName}
          getUserDetails={getUserDetails}
          userInfo={userInfo}
          refreshUser={refreshUser}
        />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                refreshUser={refreshUser}
                setRefreshUser={setRefreshUser}
              />
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/order" element={<OrderConfirmation />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
