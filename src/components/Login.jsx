import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
      setUsernameError("");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check for empty username
    if (!username.trim()) {
      setUsernameError("Username is required");
    }

    // Check for empty password
    if (!password.trim()) {
      setPasswordError("Password is required");
    }

    // Perform login logic if both username and password are provided
    if (username.trim() && password.trim()) {
      // Add your login logic here
      console.log("Logging in...");
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
                htmlFor="username"
              >
                Username
              </label>

              <input
                className={`border ${
                  usernameError ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
              {usernameError && (
                <p className="text-red-500 text-sm text-left">
                  {usernameError}
                </p>
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
