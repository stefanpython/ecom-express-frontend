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
    <nav className="bg-white-800 p-3 rounded shadow bg-slate-100">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        {/* Desktop View */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Logo */}
          <div className="text-black text-lg font-bold">Your Logo</div>

          {/* Search input */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products"
              className="bg-white-700 text-white p-2 rounded items-center"
            />
          </div>

          {/* Cart button */}
          <button className="text-black cursor-pointer">Cart</button>

          {/* Shop and Welcome buttons */}
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

          {/* Shop button */}
          <button className="text-black cursor-pointer">Shop</button>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col items-center text-center">
          {/* Logo centered */}
          <div className="text-black text-lg font-bold mb-3">Your Logo</div>

          {/* Search input */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search products"
              className="bg-white-700 text-white p-2 rounded items-center"
            />
          </div>

          {/* Shop and Welcome buttons */}
          <div className="mb-3 space-y-2">
            <button className="text-black cursor-pointer">Shop</button>
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

          {/* Cart button */}
          <button className="text-black cursor-pointer">Cart</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
