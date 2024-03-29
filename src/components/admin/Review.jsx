import { useState, useEffect } from "react";

const Review = () => {
  // State for storing reviews
  const [reviews, setReviews] = useState([]);
  const [hoveredReview, setHoveredReview] = useState(null);

  // Fetch reviews for a specific product or user
  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `https://ecom-express-backend-production.up.railway.app/reviews_list`,
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

      const reviewsData = await response.json();
      setReviews(reviewsData.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete a review
  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `https://ecom-express-backend-production.up.railway.app/review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Remove the deleted review from the state
      setReviews(reviews.filter((review) => review._id !== reviewId));

      console.log("Review deleted successfully");

      window.alert("Review deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch reviews when the component mounts
    fetchReviews();
  }, []);

  return (
    <div className="group relative">
      <h1 className="text-left font-medium">Reviews</h1>
      <hr />
      <br />

      <div className="overflow-y-auto max-h-[510px]">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={review._id}
              className="relative mb-4 hover:bg-gray-100 p-2 rounded-md"
              onMouseEnter={() => setHoveredReview(index)}
              onMouseLeave={() => setHoveredReview(null)}
            >
              <p>{`ID: ${review._id}`}</p>
              <p>{`ProductID: ${review.product}`}</p>
              <p>{`UserID: ${review.user}`}</p>
              <p>{`Title: ${review.title}`}</p>
              <p>{`Comment: ${review.comment}`}</p>
              <p>{`Rating: ${review.rating}`}</p>

              {/* Conditional rendering for delete button */}
              {hoveredReview === index && (
                <div className="absolute top-3 right-10 opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              )}

              <hr className="my-2" />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Review;
