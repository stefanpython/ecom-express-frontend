import React, { useState } from "react";

const AddReview = ({
  reviewTitle,
  setReviewTitle,
  reviewComment,
  setReviewComment,
  rating,
  setRating,
  onSubmit,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleHover = (hoveredValue) => {
    setHoveredRating(hoveredValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className=" w-full  mx-auto mt-5 border rounded-lg p-2 bg-slate-50">
      <h1 className="font-bold mb-5">Add Review</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="reviewTitle"
          >
            Review Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reviewTitle"
            type="text"
            placeholder="Enter Review Title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-left"
            htmlFor="reviewComment"
          >
            Comment
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reviewComment"
            placeholder="Write Review"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating
          </label>
          <div className="star-rating">
            {stars.map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hoveredRating || rating) ? "selected" : ""
                }`}
                onMouseEnter={() => handleHover(star)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRatingClick(star)}
              >
                &#9733; {/* Unicode star character */}
              </span>
            ))}
          </div>
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Publish Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
