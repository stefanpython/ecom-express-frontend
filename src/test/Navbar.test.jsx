import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "..components/Navbar";

describe("Navbar component", () => {
  test("renders Navbar component with logo", () => {
    const { getByAltText, getByText } = render(<Navbar />);
    const logo = getByAltText("logo");
    const linkElement = getByText(/Ecom Express/i);
    expect(logo).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  test("search functionality works", async () => {
    const { getByPlaceholderText, getByText } = render(<Navbar />);
    const searchInput = getByPlaceholderText("Search for products...");
    fireEvent.change(searchInput, { target: { value: "Bike" } });

    await waitFor(() => {
      expect(getByText("Bike")).toBeInTheDocument();
    });
  });

  test("cart toggle button opens cart", async () => {
    const { getByAltText, getByText } = render(<Navbar />);
    const cartToggleButton = getByAltText("cart");
    fireEvent.click(cartToggleButton);

    await waitFor(() => {
      expect(getByText("Shopping Cart")).toBeInTheDocument();
    });
  });

  test("dropdown toggles on click", async () => {
    const { getByText, getByTestId } = render(<Navbar />);
    const dropdownToggle = getByTestId("dropdown-toggle");
    fireEvent.click(dropdownToggle);

    await waitFor(() => {
      expect(getByText("Dashboard")).toBeInTheDocument();
    });
  });

  test("sign out button works", async () => {
    const { getByText, queryByText } = render(<Navbar />);
    const dropdownToggle = getByText("Guest");
    fireEvent.click(dropdownToggle); // Open dropdown
    const signOutButton = getByText("Sign Out");
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(queryByText("Dashboard")).not.toBeInTheDocument();
    });
  });

  test("category dropdown toggles on click", async () => {
    const { getByText, getByTestId } = render(<Navbar />);
    const categoryDropdownToggle = getByTestId("category-dropdown-toggle");
    fireEvent.click(categoryDropdownToggle);

    await waitFor(() => {
      expect(getByText("Category 1")).toBeInTheDocument();
    });
  });

  // Add more tests for other functionalities such as sign-in/sign-out, category filtering, etc.
});
