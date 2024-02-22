import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddReview from "../components/AddReview";
import { vi } from "vitest";

const setReviewTitle = vi.fn(); // Mock function
const setReviewComment = vi.fn(); // Mock function

describe("AddReview component", () => {
  test("renders the component", () => {
    render(<AddReview />);
    expect(screen.getByText("Add Review")).toBeInTheDocument();
  });

  test("enters a review title", () => {
    render(<AddReview setReviewTitle={setReviewTitle} />);
    const titleInput = screen.getByLabelText("Review Title");
    fireEvent.change(titleInput, { target: { value: "Great product!" } });
    expect(titleInput.value).toBe("Great product!");
  });

  test("enters a review comment", () => {
    render(<AddReview setReviewComment={setReviewComment} />);
    const commentInput = screen.getByLabelText("Comment");
    fireEvent.change(commentInput, {
      target: { value: "This product exceeded my expectations." },
    });
    expect(commentInput.value).toBe("This product exceeded my expectations.");
  });

  test("submits the form", () => {
    const onSubmit = vi.fn(); // Mock onSubmit function
    render(<AddReview onSubmit={onSubmit} />);
    const submitButton = screen.getByText("Publish Review");
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
