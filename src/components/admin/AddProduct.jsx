import { useState } from "react";

const AddProduct = () => {
  // State for form fields
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);

  // Dummy categories for testing (Replace with actual fetched categories)
  const categories = [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Books" },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform submission logic here (e.g., API request to create a product)
    console.log({
      productName,
      productDescription,
      productPrice,
      productQuantity,
      productCategory,
      productImage,
    });

    // Reset form fields after submission
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductQuantity("");
    setProductCategory("");
    setProductImage(null);
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
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
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
            id="productDescription"
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
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
            id="productPrice"
            type="text"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
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
            id="productQuantity"
            type="text"
            placeholder="Enter product quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
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
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
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
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
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
