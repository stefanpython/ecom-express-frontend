import { useState, useEffect } from "react";
import AccountDetails from "./dashboard/AccountDetails";
import Address from "./dashboard/Address";
import Orders from "./dashboard/Orders";
import { useLocation } from "react-router-dom";

const Dashboard = ({ userInfo, refreshUser, setRefreshUser }) => {
  const [selectedTab, setSelectedTab] = useState("");

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromParams = searchParams.get("selectedTab");
    if (tabFromParams) {
      setSelectedTab(tabFromParams);
    }
  }, [location.search]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="grid h-max sm:flex sm:min-h-[875px]">
      {/* Left Sidebar with Tabs */}
      <div className="h-25 sm:h-auto w-auto  bg-slate-100 p-4 lg:hidden sm:mb-44">
        {/* Collapsible Menu for Small Screens */}

        <h1 className="text-xl mb-2 font-medium">Account</h1>

        <select
          onChange={(e) => handleTabClick(e.target.value)}
          value={selectedTab}
          className="w-full py-2 border border-gray-300 bg-white"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="accountDetails">Account Details</option>
          <option value="address">Address</option>
          <option value="orders">Orders</option>
        </select>
      </div>

      {/* Left Sidebar with Tabs (Visible on Larger Screens) */}
      <div className="w-fit  bg-slate-100 p-4 hidden lg:block mb-44">
        <h1 className="text-xl mb-6 font-medium">Account</h1>

        <button
          onClick={() => handleTabClick("accountDetails")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "accountDetails"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          Account Details
        </button>

        <button
          onClick={() => handleTabClick("address")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "address" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Address
        </button>

        <button
          onClick={() => handleTabClick("orders")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "orders" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Orders
        </button>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-4">
        <h1>Welcome to your dashboard panel</h1>
        {/* Render the selected form based on the selectedTab */}
        {selectedTab === "address" && <Address userInfo={userInfo} />}
        {selectedTab === "accountDetails" && (
          <AccountDetails
            refreshUser={refreshUser}
            setRefreshUser={setRefreshUser}
          />
        )}
        {selectedTab === "orders" && <Orders />}
      </div>
    </div>
  );
};

export default Dashboard;
