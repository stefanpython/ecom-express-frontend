import { useState } from "react";

const AddCategory = () => {
  // State for form fields
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform submission logic here (e.g., API request to create a category)
    console.log({
      categoryName,
      categoryDescription,
    });

    // Reset form fields after submission
    setCategoryName("");
    setCategoryDescription("");
  };

  return (
    <div>
      <h1 className="text-left font-medium">Add Category</h1>

      <hr />
      <br />

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryName"
          >
            Name
          </label>
          <input
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categoryDescription"
          >
            Description
          </label>
          <textarea
            className="border border-gray-300 rounded w-full sm:w-1/2 py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="categoryDescription"
            placeholder="Enter category description"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          type="submit"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
