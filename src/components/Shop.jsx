import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 29.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 39.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 29.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 4,
    name: "Product 4",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 39.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 5,
    name: "Product 5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 29.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 6,
    name: "Product 6",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 39.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 7,
    name: "Product 7",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 29.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 8,
    name: "Product 8",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 39.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 9,
    name: "Product 9",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 29.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 10,
    name: "Product 10",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 39.99,
    image: "https://via.placeholder.com/250",
  },
  {
    id: 11,
    name: "Product 11",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 39.99,
    image: "https://via.placeholder.com/250",
  },
];
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

  console.log(currentProducts);

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
                  src={product.image}
                  alt={product.name}
                  className="mb-2 mx-auto"
                />
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
          totalItemsCount={mockProducts.length}
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
