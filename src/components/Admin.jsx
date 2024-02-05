import { useState } from "react";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import Review from "./admin/Review";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="grid h-max sm:flex sm:min-h-[875px]">
      {/* Left Sidebar with Tabs */}
      <div className="h-25 sm:h-auto w-auto  bg-slate-100 p-4 lg:hidden sm:mb-44">
        {/* Collapsible Menu for Small Screens */}

        <h1 className="text-xl mb-2 font-medium">Admin Panel</h1>

        <select
          onChange={(e) => handleTabClick(e.target.value)}
          value={selectedTab}
          className="w-full py-2 border border-gray-300 bg-white"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="addProduct">Add Product</option>
          <option value="editProduct">Edit Product</option>
          <option value="addCategory">Add Category</option>
          <option value="review">Reviews</option>
        </select>
      </div>

      {/* Left Sidebar with Tabs */}
      <div className="w-fit  bg-slate-100 p-4 hidden lg:block mb-44 ">
        <h1 className="text-xl mb-6 font-medium mt-10">Admin Panel</h1>

        <button
          onClick={() => setSelectedTab("addProduct")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "addProduct" ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          Add Product
        </button>

        <button
          onClick={() => setSelectedTab("editProduct")}
          className={`w-full py-2 border border-gray-300 ${
            selectedTab === "editProduct"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
        >
          Edit Product
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
        {selectedTab === "editProduct" && <EditProduct />}
        {selectedTab === "addCategory" && <AddCategory />}
        {selectedTab === "review" && <Review />}
      </div>
    </div>
  );
};

export default Admin;
