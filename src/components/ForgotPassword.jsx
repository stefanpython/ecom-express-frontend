import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    // Check for empty email
    if (!email.trim()) {
      setEmailError("Email is required");
    }

    // Perform login logic if both username and password are provided
    if (email.trim()) {
      // Add your login logic here
      console.log("Logging in...");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-48">
        <div className="bg-white p-8 rounded shadow-custom w-full sm:w-96">
          <h1 className="text-2xl font-medium mb-6 text-left">
            Forgot Password
          </h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className={`border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                id="email"
                name="email"
                type="text"
                placeholder="Enter Your Email address"
                value={email}
                onChange={handleInputChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm text-left">{emailError}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleForgotPassword}
                className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Send Email
              </button>

              <div className="text-blue-500 text-sm">
                <Link to="/login">Back To Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
