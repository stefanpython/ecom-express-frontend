import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  const [cookies, setCookies] = useCookies(["token"]);
  const [categories, setCategories] = useState("");

  const navigate = useNavigate();

  const { productId } = useParams();

  // Fetch product details based on id
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const productData = await response.json();
      setProductDetails(productData.product);

      setProductDetails((prevProductDetails) => ({
        ...prevProductDetails,
        category: "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle input change for files aka iamges
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setProductDetails((prevData) => ({ ...prevData, image: file }));
  };

  // Handle Submit on Edit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if category is selected
    if (productDetails.category === "") {
      window.alert("Please select a category");
      return; // Stop further execution
    }

    const formData = new FormData();

    formData.append("image", productDetails.image);
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("price", productDetails.price);
    formData.append("quantity", productDetails.quantity);
    formData.append("category", productDetails.category);

    try {
      const response = await fetch(
        `http://localhost:3000/update_product/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedProductData = await response.json();
      console.log("Product updated successfully:", updatedProductData);

      window.alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Fetch a list of all categories
  const fetchCategoryList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/category_list`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const categoryData = await response.json();
      setCategories(categoryData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  // Handle delete product by id
  const handleDeleteItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/delete_product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      console.log("Item deleted successfully");

      window.alert("Item deleted successfully");

      navigate(`/admin?selectedTab=editProduct`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[870px]">
      <div className="-mt-56">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className=" flex justify-end text-right">
            <button
              className="text-blue-500 hover:bg-slate-100 p-1 rounded-md"
              onClick={() => navigate(`/admin?selectedTab=editProduct`)}
            >
              Back to Items
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="name"
                type="text"
                name="name"
                value={productDetails.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="description"
                type="text"
                name="description"
                value={productDetails.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="price"
                type="text"
                name="price"
                value={productDetails.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="quantity"
                type="text"
                name="quantity"
                value={productDetails.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>

              <select
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="category"
                name="category"
                value={productDetails.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                id="image"
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                type="submit"
              >
                Save Changes
              </button>

              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-blue"
                type="button"
                onClick={handleDeleteItem}
              >
                Delete Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
