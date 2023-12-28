import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-48">
        <div className="bg-white p-8 rounded shadow-custom w-full sm:w-96">
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="email"
                type="text"
                placeholder="Enter Your Email address"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="firstname"
                type="text"
                placeholder="Enter Your First Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="lastname"
                type="text"
                placeholder="Enter Your Last Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="password"
                type="password"
                placeholder="Enter Your Password"
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
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
