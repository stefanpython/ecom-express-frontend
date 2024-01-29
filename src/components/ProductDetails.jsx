import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const ProductDetails = ({ refreshLogin, setRefreshLogin }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [cookies, setCookies] = useCookies(["token"]);

  const [productDetails, setProductDetails] = useState("");

  const { productId } = useParams();

  // Handle setting product quantity
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  // Get details for a product based on id
  const getProductDetails = async () => {
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

      const itemData = await response.json();
      setProductDetails(itemData.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  // Handle Add product to cart button
  const handleAddToCart = async () => {
    try {
      const url = cookies.token
        ? "http://localhost:3000/add_cart_auth"
        : "http://localhost:3000/add_cart_guest";

      const headers = {
        "Content-Type": "application/json",
      };

      // Add Authorization header if cookies.token is not empty
      if (cookies.token) {
        headers["Authorization"] = `Bearer ${cookies.token}`;
      }

      const addToCartResponse = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          product: productDetails._id,
          quantity: parseInt(quantity),
        }),
      });

      if (!addToCartResponse.ok) {
        const errorData = await addToCartResponse.json();
        throw new Error(errorData.message);
      }

      const cartData = await addToCartResponse.json();
      console.log(cartData.message);

      setRefreshLogin(!refreshLogin);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/review/create/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify({
            rating: parseInt(rating),
            comment: reviewComment,
            title: reviewTitle,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const reviewData = await response.json();

      // Assuming the backend returns the newly created review
      const newReview = reviewData.review;

      console.log(newReview);

      // Clear the input fields after submitting
      setReviewTitle("");
      setReviewComment("");
      setRating(0);

      console.log("Review added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-6 lg:px-44 lg:mb-40 min-h-screen">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-6 pt-6 bg-slate-100 px-4 sm:-mb-96 ">
          <img
            className="border rounded-lg w-60"
            src={productDetails.image}
            alt=""
          />

          <div className="text-left border rounded-lg p-2 bg-slate-50">
            <h1 className="font-bold text-2xl text-blue-500 mb-2">
              {productDetails.name}
            </h1>

            <p>{productDetails.description}</p>

            <br />

            <h2 className="font-medium text-2xl">${productDetails.price}</h2>

            <div className="flex items-left mt-2 flex-col mr-2">
              <label className="mr-2 mb-2">Quantity:</label>
              <input
                type="number"
                min="1"
                max="999"
                value={quantity}
                onChange={handleQuantity}
                className="border border-gray-300 p-1 w-26 text-left"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center mt-32 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <img
                className="w-6 mr-4 -ml-2 bg-white rounded-sm"
                src="./add-cart.png"
                alt=""
              />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="sm:mb-44">
        <div>
          <AddReview
            reviewTitle={reviewTitle}
            setReviewTitle={setReviewTitle}
            reviewComment={reviewComment}
            setReviewComment={setReviewComment}
            rating={rating}
            setRating={setRating}
            onSubmit={handleReviewSubmit}
          />
        </div>

        <div>
          {userReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4 pb-6"
            >
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h1 className="text-xl font-semibold">{review.name}</h1>
                  <div className="flex items-center mt-2">
                    {/* Render stars based on the rating */}
                    {[...Array(review.rating)].map((_, index) => (
                      <span key={index} className="text-yellow-500 text-xl">
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-left ml-16 mt-2">
                {review.date}
              </p>
              <p className="mt-4 text-gray-600 text-left ml-16">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
