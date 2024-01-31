import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const ProductsPerPage = 9;

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

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

      <div className="flex justify-center w-fit">
        <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-6 ">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 items-center shadow-custom"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={`http://localhost:3000/images/${product.image}`}
                  alt={product.name}
                  className="mb-2 mx-auto w-64 h-56"
                />

                <hr />
                <br />

                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-sm mb-2">{product.description}</p>
                <p className="text-base font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
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
          activeLinkClass="z-10 bg-gray-500 text-white border-gray-500"
          prevPageText="Prev"
          nextPageText="Next"
        />
      </div>
    </div>
  );
};

export default Shop;
