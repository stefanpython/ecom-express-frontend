import AddReview from "./AddReview";
import { useState } from "react";

const mockProduct = {
  id: 1,
  name: "Dell Laptop",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  price: 29.99,
  image: "https://via.placeholder.com/250",
  quantity: 20,
};

const reviewsData = [
  {
    id: 1,
    name: "John Doe",
    rating: 3,
    date: "January 15, 2023",
    comment: "Great product!",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 5,
    date: "March 22, 2023",
    comment: "Excellent service!",
  },

  {
    id: 2,
    name: "Jane Smith",
    rating: 5,
    date: "March 22, 2023",
    comment: "Excellent service!",
  },
];

const ProductDetails = () => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Submit review logic goes here
    console.log(reviewTitle, reviewComment, rating);
  };

  return (
    <div className="container mx-auto px-6 lg:px-44 sm:h-screen lg:mb-40 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-6 pt-6 bg-slate-50 px-4">
        <img className="border rounded-lg" src="./laptop.jpg" alt="" />

        <div className="text-left border rounded-lg p-2">
          <h1 className="font-bold text-2xl text-blue-500 mb-2">
            {mockProduct.name}
          </h1>

          <p>{mockProduct.description}</p>

          <br />

          <h2 className="font-medium text-2xl">${mockProduct.price}</h2>

          <div className="flex items-left mt-2 flex-col mr-2">
            <label className="mr-2 mb-2">Quantity:</label>
            <input
              type="number"
              min="1"
              max="999"
              defaultValue={1}
              className="border border-gray-300 p-1 w-26 text-left"
            />
          </div>

          <button className="flex items-center mt-32 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <img className="w-7 mr-2" src="./add-cart.png" alt="" />
            Add to cart
          </button>
        </div>

        <div>
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-lg rounded-lg p-4 mb-4"
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
              <div className="mt-4 flex justify-between items-center"></div>
              <hr />
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default ProductDetails;
