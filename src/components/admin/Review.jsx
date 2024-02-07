import { useState, useEffect } from "react";

const Review = () => {
  // State for storing reviews
  const [reviews, setReviews] = useState([]);

  // Fetch reviews for a specific product or user
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3000/reviews_list`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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
  const deleteReview = async (reviewId) => {};

  useEffect(() => {
    // Fetch reviews when the component mounts
    fetchReviews();
  }, []);

  console.log(reviews);
  return (
    <div>
      <h1 className="text-left font-medium">Reviews</h1>
      <hr />
      <br />

      <div className="overflow-y-auto max-h-[510px]">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="mb-4 hover:bg-gray-100 p-2 rounded-md"
            >
              <p>{`ID: ${review._id}`}</p>
              <p>{`ProductID: ${review.product}`}</p>
              <p>{`UserID: ${review.user}`}</p>
              <p>{`Title: ${review.title}`}</p>
              <p>{`Comment: ${review.comment}`}</p>
              <p>{`Rating: ${review.rating}`}</p>

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
