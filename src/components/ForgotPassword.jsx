import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Check for empty email
    if (!email.trim()) {
      setEmailError("Email is required");
    } else {
      try {
        // Send a request to your backend for the forgot password functionality
        const response = await fetch("http://localhost:3000/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          // Reset the email input and display a success message
          setEmail("");
          setResetPasswordMessage("Password reset email sent successfully");
        } else {
          const errorData = await response.json();
          setEmailError(errorData.message);
        }
      } catch (error) {
        console.error("Error sending forgot password request:", error);
      }
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

            <div className="mb-4">
              {resetPasswordMessage && (
                <p className="text-green-500 text-sm text-left">
                  {resetPasswordMessage}
                </p>
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
