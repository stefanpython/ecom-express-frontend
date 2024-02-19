import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProductsPerPage = 12;

const Shop = ({ handleAddToCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();

  // Function to parse query parameters from URL
  const getQueryParam = (key) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(key);
  };
  const categoryId = getQueryParam("category");

  // Filter products by category ID
  useEffect(() => {
    if (categoryId) {
      const filteredProducts = originalProducts.filter(
        (product) => product.category._id === categoryId
      );
      setProducts(filteredProducts);
    } else {
      setProducts(originalProducts);
    }
  }, [categoryId, originalProducts]);

  // Get products list
  const getProductsList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/product_list`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const productsData = await response.json();
      setProducts(productsData.products);
      setOriginalProducts(productsData.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  // Function to handle sorting
  const handleSortChange = (event) => {
    const sortByOption = event.target.value;
    setSortBy(sortByOption);
    let sortedProducts = [...products]; // Create a copy of the products array

    // Sort products based on the selected option
    if (sortByOption === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortByOption === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts); // Update the state with sorted products
  };

  // Pagination
  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-24 sm:px-6 lg:px-44 ">
      <br />

      {/* Dropdown for sorting */}
      <div className="flex justify-end mb-4 bg-gray-100 p-2 rounded-md">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded bg-white"
        >
          <option value="">Sort by</option>
          <option value="lowToHigh">Price Low to High</option>
          <option value="highToLow">Price High to Low</option>
        </select>
      </div>

      <div className="flex justify-center w-fit">
        <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-6 ">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 items-center shadow-custom hover:scale-110"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={`http://localhost:3000/images/${product.image}`}
                  alt={product.name}
                  className="mb-2 mx-auto w-44 h-32"
                />

                <hr />
                <br />

                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-sm mb-2">{product.description}</p>
                <p className="text-base font-semibold">
                  ${product.price?.toFixed(2)}
                </p>
              </Link>

              <div className="flex justify-center">
                <button
                  onClick={() => handleAddToCart(product._id, quantity)}
                  className="mt-7 flex items-center p-2 bg-blue-500 hover:bg-blue-700 text-white font-medium px-10 rounded focus:outline-none focus:shadow-outline"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 mb-48">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={ProductsPerPage}
          totalItemsCount={products.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring ring-gray-500 focus:border-gray-500 active:bg-gray-100"
          linkClass="relative inline-flex items-center px-2 py-2 border text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring ring-gray-500 focus:border-gray-500"
          activeLinkClass="z-10 bg-gray-500 text-black border-gray-500"
          prevPageText="Prev"
          nextPageText="Next"
        />
      </div>
    </div>
  );
};

export default Shop;
