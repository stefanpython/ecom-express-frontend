import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const AddProduct = () => {
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

  // Fetch a list of all categories
  const fetchCategoryList = async () => {
    try {
      const response = await fetch(
        `https://ecom-express-backend-production.up.railway.app/category_list`,
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

      const categoryData = await response.json();
      setCategories(categoryData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", productDetails.image);
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("price", productDetails.price);
    formData.append("quantity", productDetails.quantity);
    formData.append("category", productDetails.category);

    try {
      const response = await fetch(
        `https://ecom-express-backend-production.up.railway.app/create_product`,
        {
          method: "POST",
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

      const createdProduct = await response.json();
      console.log("Product updated successfully:", createdProduct);

      // Reset the input fields after successful form submission
      setProductDetails({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        image: null,
      });

      // Admin confirmation pop-up
      window.alert("Product successfully added!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1 className="text-left font-medium">Add Product</h1>

      <hr />
      <br />

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Name
          </label>
          <input
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="name"
            name="name"
            type="text"
            placeholder="Enter product name"
            value={productDetails.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productDescription"
          >
            Description
          </label>
          <textarea
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="description"
            name="description"
            placeholder="Enter product description"
            value={productDetails.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productPrice"
          >
            Price
          </label>
          <input
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="price"
            name="price"
            type="text"
            placeholder="Enter product price"
            value={productDetails.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productQuantity"
          >
            Quantity
          </label>
          <input
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="quantity"
            name="quantity"
            type="text"
            placeholder="Enter product quantity"
            value={productDetails.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productCategory"
          >
            Category
          </label>
          <select
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="category"
            name="category"
            value={productDetails.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a category
            </option>
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
            htmlFor="productImage"
          >
            Image
          </label>
          <input
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="productImage"
            name="image"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
