import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { vi } from "vitest";

describe("Navbar component", () => {
  test("renders Navbar component with logo", () => {
    const { getByAltText, getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    const logo = getByAltText("logo");
    const linkElement = getByText(/Ecom Express/i);
    expect(logo).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  test("search functionality works", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    const searchInput = getByPlaceholderText("Search for products...");
    fireEvent.change(searchInput, { target: { value: "Bike" } });

    await waitFor(() => {
      expect(getByText("Bike")).toBeInTheDocument();
    });
  });

  test("cart toggle button opens cart", async () => {
    const setIsCartOpen = vi.fn();
    const { getByAltText, getByText } = render(
      <Router>
        <Navbar setIsCartOpen={setIsCartOpen} />
      </Router>
    );
    const cartToggleButton = getByAltText("cart");
    fireEvent.click(cartToggleButton);

    await waitFor(() => {
      expect(getByText("Shopping Cart")).toBeInTheDocument();
    });
  });

  test("guest toggle button works", async () => {
    const { getByText, queryByText } = render(
      <Router>
        <Navbar />
      </Router>
    );
    const dropdownToggle = getByText("Guest");
    fireEvent.click(dropdownToggle);

    await waitFor(() => {
      expect(queryByText("Dashboard")).not.toBeInTheDocument();
    });
  });

  test("category dropdown toggles on click", async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <Navbar />
      </Router>
    );
    const categoryDropdownToggle = getByTestId("category-dropdown-container");
    fireEvent.click(categoryDropdownToggle);

    await waitFor(() => {
      expect(getByText("Smartphones")).toBeInTheDocument();
    });
  });
});
