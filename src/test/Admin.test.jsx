import { render, fireEvent } from "@testing-library/react";
import Admin from "../components/Admin";
import { BrowserRouter as Router } from "react-router-dom";

describe("Admin component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Admin />
      </Router>
    );
  });

  it("selects the correct tab when clicked", () => {
    const { getByRole } = render(
      <Router>
        <Admin />
      </Router>
    );
    const addProductTab = getByRole("button", { name: /add product/i });
    const editProductTab = getByRole("button", { name: /edit product/i });
    const addCategoryTab = getByRole("button", { name: /add category/i });
    const reviewTab = getByRole("button", { name: /review/i });

    fireEvent.click(addProductTab);
    expect(getByRole("heading", { name: /add product/i })).toBeInTheDocument();

    fireEvent.click(editProductTab);
    expect(getByRole("heading", { name: /edit product/i })).toBeInTheDocument();

    fireEvent.click(addCategoryTab);
    expect(getByRole("heading", { name: /add category/i })).toBeInTheDocument();

    fireEvent.click(reviewTab);
    expect(getByRole("heading", { name: /review/i })).toBeInTheDocument();
  });

  it("renders the correct form based on the selected tab", () => {
    const { getByRole, getByText } = render(
      <Router>
        <Admin />
      </Router>
    );

    // Click on the "Add Product" tab
    fireEvent.click(getByRole("button", { name: /add product/i }));

    // Check if the form heading is rendered
    expect(getByText("Add Product", { selector: "h1" })).toBeInTheDocument();
  });
});
