import { useState } from "react";

const Navbar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Add your sign-out logic here
    setIsUserLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="p-3 shadow bg-slate-100">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-center space-x-4 justify-center flex-grow mr-4 sm:justify-start sm:mr-0 sm:flex-grow-0">
          <div className="text-black text-lg font-bold">Ecom Express</div>
        </div>

        <div className="flex space-x-4 flex-grow justify-center pt-3 sm:pt-0 ">
          <input
            type="text"
            placeholder="Search products"
            className="bg-white-700 text-white p-2 rounded items-center w-auto md:w-96"
          />
        </div>

        <div className="flex space-x-2 flex-grow justify-between pt-5 sm:pt-0 sm:flex-grow-0">
          <div className="flex space-x-4 pl-1 sm:pl-0">
            <button className="text-black cursor-pointer">
              <img className="w-6 h-6" src="./cart.png" alt="cart" />
              <span className="bg-red-500 text-white rounded-full  w-5 h-5 absolute  -mt-8 ml-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="flex justify-end flex-grow pl-2">
            <button className="text-black cursor-pointer">Shop</button>
          </div>

          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="text-black cursor-pointer"
            >
              Welcome, {isUserLoggedIn ? "User" : "Guest"}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white p-4 rounded shadow">
                {isUserLoggedIn ? (
                  <>
                    <div>Dashboard</div>
                    <div className="cursor-pointer" onClick={handleSignOut}>
                      Sign Out
                    </div>
                  </>
                ) : (
                  <>
                    <div>Login</div>
                    <div>Sign Up</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
