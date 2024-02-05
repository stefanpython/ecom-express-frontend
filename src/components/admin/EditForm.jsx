import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setProductDetails((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", productDetails.image);
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("price", productDetails.price);
    formData.append("quantity", productDetails.quantity);

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

      console.log("Form data: ", formData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedProductData = await response.json();
      console.log("Product updated successfully:", updatedProductData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[879px]">
      <div className="-mt-64">
        <div className="bg-white shadow-lg rounded-lg p-8">
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

            {/* <div className="mb-4">
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
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div> */}

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
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
