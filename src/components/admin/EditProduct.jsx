import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/product_list");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const allProducts = await response.json();
      setProducts(allProducts.products);
      setFilteredProducts(allProducts.products); // Initialize filteredProducts with all products
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // Function to filter products by name
  const filterProductsByName = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Fetch all products when the component mounts
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // Update filtered products when searchQuery changes
    filterProductsByName();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  console.log(searchQuery);

  return (
    <div>
      <h1 className="text-left font-semibold">Edit Products</h1>

      <hr />
      <br />
      <form>
        <div className="mb-4 flex">
          <input
            className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
            id="searchQuery"
            type="text"
            placeholder="Search for product by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      <hr />
      <br />

      <div className="overflow-y-auto max-h-[510px]">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product._id} to={`/editproduct/${product._id}`}>
              <div
                key={product._id}
                className="mb-4 hover:bg-gray-100 p-2 rounded-md"
              >
                <p>{`ID: ${product._id}`}</p>
                <p>{`Name: ${product.name}`}</p>
                <p>{`Description: ${product.description}`}</p>
                <p>{`Price: ${product.price}`}</p>
                <p>{`Quantity: ${product.quantity}`}</p>
                <p>{`Image: ${product.image}`}</p>
                <hr className="my-2" />
              </div>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
