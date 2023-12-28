const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-[879px] ">
      <div className="-mt-48">
        <div className="bg-white p-8 rounded shadow-custom w-full sm:w-96 ">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-left text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="username"
                type="text"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
