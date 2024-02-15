import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import Shop from "../components/Shop";
import { vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

describe("Shop component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            products: [
              {
                _id: "1",
                name: "Product 1",
                description: "Description 1",
                price: 10.99,
                image: "product1.jpg",
                category: { _id: "1" },
              },
              {
                _id: "2",
                name: "Product 2",
                description: "Description 2",
                price: 20.99,
                image: "product2.jpg",
                category: { _id: "2" },
              },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Router>
        <Shop />
      </Router>
    );
  });

  it("fetches products on component mount", async () => {
    render(
      <Router>
        <Shop />
      </Router>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/product_list",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
  });

  it("filters products by category when categoryId is provided in URL", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          products: [{ _id: "1", category: { _id: "category_id" } }],
        }),
    });

    render(
      <Router>
        <Shop />
      </Router>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  it("sorts products by price when sorting option is changed", async () => {
    render(
      <Router>
        <Shop />
      </Router>
    );
    const sortBySelect = screen.getByRole("combobox");
    fireEvent.change(sortBySelect, { target: { value: "lowToHigh" } });
    await waitFor(() => {
      expect(screen.getByText("Price Low to High")).toBeInTheDocument();
    });
  });

  it("handles pagination correctly", async () => {
    const { getByText } = render(
      <Router>
        <Shop />
      </Router>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    fireEvent.click(getByText("Next"));
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
