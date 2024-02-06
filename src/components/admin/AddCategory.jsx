import { useState } from "react";
import { useCookies } from "react-cookie";

const AddCategory = () => {
  // State for form fields
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [cookies, setCookies] = useCookies(["token"]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/create_category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          name: categoryName,
          description: categoryDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      window.alert("Category added successfully");

      // Reset form fields after submission
      setCategoryName("");
      setCategoryDescription("");
    } catch (error) {
      console.log(error);
    }
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
            id="name"
            name="name"
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
            id="description"
            name="description"
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
