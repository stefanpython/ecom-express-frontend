import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";
import Orders from "../components/dashboard/Orders";

vi.mock("react-cookie", () => ({
  useCookies: vi.fn(),
}));

describe("Orders component", () => {
  beforeEach(() => {
    useCookies.mockReturnValue([{}, vi.fn(), vi.fn()]);
  });

  it("renders the component", () => {
    render(
      <Router>
        <Orders />
      </Router>
    );
    expect(screen.getByText("Orders")).toBeInTheDocument();
  });

  it("searches for an order", async () => {
    // Mock fetch function
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            order: {
              _id: "123",
              status: "Delivered",
              createdAt: new Date().toISOString(),
              totalAmount: 100,
              items: [
                { _id: "1", product: { name: "Product 1" }, quantity: 2 },
              ],
            },
          }),
      })
    );

    render(
      <Router>
        <Orders />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText("Search for order by ID");
    fireEvent.change(searchInput, { target: { value: "123" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    // Wait for fetch call
    await screen.findByText("ID: 123");
    expect(
      screen.getByText("Product: Product 1, Quantity: 2")
    ).toBeInTheDocument();
  });
});
