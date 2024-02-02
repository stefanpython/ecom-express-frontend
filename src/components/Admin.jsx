import { useState } from "react";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Review from "./admin/Review";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("addProduct");

  return (
    <div className="flex h-max sm:flex sm:min-h-[875px]">
      {/* Left Sidebar with Tabs */}
      <div className="w-1/4 bg-slate-100 p-4">
        <h1 className="text-xl mb-6 font-medium">Admin Panel</h1>

        <button
          onClick={() => setSelectedTab("addProduct")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "addProduct" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Add Product
        </button>

        <button
          onClick={() => setSelectedTab("addCategory")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "addCategory"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          Add Category
        </button>

        <button
          onClick={() => setSelectedTab("review")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "review" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Review
        </button>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-4">
        <h1>Welcome to the Admin panel</h1>
        {/* Render the selected form based on the selectedTab */}
        {selectedTab === "addProduct" && <AddProduct />}
        {selectedTab === "addCategory" && <AddCategory />}
        {selectedTab === "review" && <Review />}
      </div>
    </div>
  );
};

export default Admin;
