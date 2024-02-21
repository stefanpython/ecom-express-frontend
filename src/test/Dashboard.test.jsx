import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../components/Dashboard"; // Make sure to provide the correct path

describe("Dashboard component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );
  });

  it("renders the selected tab based on URL parameter", () => {
    const { getAllByText } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    waitFor(() => expect(getAllByText("Account Details")).toBeInTheDocument());
  });

  it("handles tab selection correctly", async () => {
    const { getByRole, getByText } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    const addressButton = getByRole("button", { name: /Address/i });
    fireEvent.click(addressButton);

    // Wait for the "Address" text to appear within the right content area
    await waitFor(() => {
      const addressText = getByText("Addresses");
      expect(addressText).toBeInTheDocument();
    });
  });

  it("renders AccountDetails component when 'accountDetails' tab is selected", () => {
    const { getByText, getByRole } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    const accountButton = getByRole("button", { name: /Account Details/i });
    fireEvent.click(accountButton);

    expect(getByText("Welcome to your dashboard panel")).toBeInTheDocument();
  });

  it("renders Address component when 'address' tab is selected", () => {
    const { getByText, getByRole } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    const addressButton = getByRole("button", { name: /Address/i });
    fireEvent.click(addressButton);

    expect(getByText("Welcome to your dashboard panel")).toBeInTheDocument();
  });

  it("renders Orders component when 'orders' tab is selected", () => {
    const { getByText, getByRole } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    const ordersButton = getByRole("button", { name: /orders/i });
    fireEvent.click(ordersButton);

    expect(getByText("Welcome to your dashboard panel")).toBeInTheDocument();
  });
});
