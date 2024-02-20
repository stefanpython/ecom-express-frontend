import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { vi } from "vitest";

// Mocking useLocation hook
const mockLocation = {
  pathname: "/dashboard",
  search: "?selectedTab=accountDetails",
};

describe("Dashboard component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );
  });

  it("renders the selected tab based on URL parameter", () => {
    const { getByText } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    const loginButton = getByRole("button", { name: /login/i });

    expect(getByText("Account Details")).toBeInTheDocument();
  });

  it("handles tab selection correctly", () => {
    const { getByText } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    fireEvent.click(getByText("Address"));
    expect(getByText("Address")).toBeInTheDocument();
  });

  it("renders AccountDetails component when 'accountDetails' tab is selected", () => {
    const { getByText } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    fireEvent.click(getByText("Account Details"));
    expect(getByText("Welcome to your dashboard panel")).toBeInTheDocument();
  });

  it("renders Address component when 'address' tab is selected", () => {
    const { getByText } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    fireEvent.click(getByText("Address"));
    expect(getByText("Welcome to your dashboard panel")).toBeInTheDocument();
  });

  it("renders Orders component when 'orders' tab is selected", () => {
    const { getByText } = render(
      <Router>
        <Dashboard userInfo={{}} />
      </Router>
    );

    fireEvent.click(getByText("Orders"));
    expect(getByText("Welcome to your dashboard panel")).toBeInTheDocument();
  });
});
