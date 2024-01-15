import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    } else if (name === "firstname") {
      setFirstName(value);
      setFirstNameError("");
    } else if (name === "lastname") {
      setLastName(value);
      setLastNameError("");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setConfirmPasswordError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check for empty email
    if (!email.trim()) {
      setEmailError("Email is required");
    }

    // Check for empty first name
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
    }

    // Check for empty last name
    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
    }

    // Check for empty password
    if (!password.trim()) {
      setPasswordError("Password is required");
    }

    // Check for empty confirmation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirmation is required");
    }

    // Check if password and confirmation match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Confirmation does not match password");
    }

    // Perform signup logic
    try {
      // Make API request to singup endpoint
      const response = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup failed", errorData.message);
        return; // Add this line to prevent further execution
      }

      // Handle successful signup
      const data = await response.json();
      console.log("User created successfully", data.savedUser);

      // Re-direct user to login page
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-48">
        <div className="bg-white p-8 rounded shadow-custom w-full sm:w-96">
          <h1 className="text-2xl font-medium mb-6 text-left">Sign Up</h1>
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
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className={`border ${
                  firstNameError ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={handleInputChange}
              />
              {firstNameError && (
                <p className="text-red-500 text-sm text-left">
                  {firstNameError}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                className={`border ${
                  lastNameError ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Enter Your Last Name"
                value={lastName}
                onChange={handleInputChange}
              />
              {lastNameError && (
                <p className="text-red-500 text-sm text-left">
                  {lastNameError}
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
                name="password"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={handleInputChange}
              />
              {passwordError && (
                <p className="text-red-500 text-sm text-left">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`border ${
                  confirmPasswordError ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500`}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={handleInputChange}
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm text-left">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleSignup}
                className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                SignUp
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

export default Signup;
