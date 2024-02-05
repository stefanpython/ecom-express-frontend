import { useState, useEffect } from "react";

const Review = ({ productId, userId }) => {
  // State for storing reviews
  const [reviews, setReviews] = useState([]);

  // Fetch reviews for a specific product or user
  const fetchReviews = async () => {};

  // Delete a review
  const deleteReview = async (reviewId) => {};

  useEffect(() => {
    // Fetch reviews when the component mounts
    fetchReviews();
  }, [productId, userId]); // Include dependencies based on your fetching criteria

  return (
    <div>
      <h1 className="text-left font-medium">Reviews</h1>

      <hr />
      <br />

      {reviews.map((review) => (
        <div key={review._id} className="mb-4">
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
          {/* Display additional review details as needed */}
          {userId && (
            <button
              onClick={() => deleteReview(review._id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
            >
              Delete Review
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Review;
