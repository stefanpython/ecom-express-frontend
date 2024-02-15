import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import ProductDetails from "../components/ProductDetails";
import { vi } from "vitest";

describe("ProductDetails component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            _id: "1",
            name: "Product 1",
            description: "Description 1",
            price: 10.99,
            image: "product1.jpg",
            category: { _id: "1" },
            quantity: 5,
          }),
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<ProductDetails />);
  });

  it("fetches product details on component mount", async () => {
    render(<ProductDetails />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/product/undefined",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
  });

  it("handles quantity change correctly", async () => {
    render(<ProductDetails />);
    const quantityInput = screen.getByRole("spinbutton");
    fireEvent.change(quantityInput, { target: { value: "2" } });
    expect(quantityInput.value).toBe("2");
  });

  it("handles add to cart correctly", async () => {
    render(<ProductDetails />);
    const addToCartButton = screen.getByText("Add to cart");
    fireEvent.click(addToCartButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/add_cart_guest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: "1",
            quantity: 1,
          }),
        }
      );
    });
  });
});
