import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const Login = ({ refreshLogin, setRefreshLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for empty email
    if (!email.trim()) {
      setEmailError("Email is required");
    }

    // Check for empty password
    if (!password.trim()) {
      setPasswordError("Password is required");
    }

    // Perform login logic if both email and password are provided
    try {
      const response = await fetch(
        "https://ecom-express-backend-production.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed", errorData.message);
        setError(errorData.message);
        return;
      }

      // Handle successful login
      const data = await response.json();
      // console.log("Login successfully", data);

      // Set token in cookies
      const { token } = data;
      setCookie("token", token, { path: "/" });

      setRefreshLogin(!refreshLogin);

      // Check for pending order in local storage
      const pendingOrder = localStorage.getItem("pendingOrder");
      if (pendingOrder) {
        const parsedOrder = JSON.parse(pendingOrder);

        // Send the pending order to the server
        const orderResponse = await fetch(
          "https://ecom-express-backend-production.up.railway.app/create_order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(parsedOrder),
          }
        );

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          console.error("Failed to create order:", errorData.message);
          return;
        }

        // Clear the pending order from local storage
        localStorage.removeItem("pendingOrder");
      }

      navigate(pendingOrder ? "/order" : "/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-48">
        <div className="bg-white p-8 rounded shadow-custom w-full sm:w-96">
          <h1 className="text-2xl font-medium mb-6 text-left">Login</h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>

              <input
                className={`border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
              {emailError && (
                <p className="text-red-500 text-sm text-left">{emailError}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className={`border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
              {passwordError && (
                <p className="text-red-500 text-sm text-left">
                  {passwordError}
                </p>
              )}

              {error && (
                <p className="text-red-500 text-sm text-left">{error}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleLogin}
                className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Login
              </button>
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create An Account
              </Link>
            </div>

            <div className="text-blue-500 text-sm">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
