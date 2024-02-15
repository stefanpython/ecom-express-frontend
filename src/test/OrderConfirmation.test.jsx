import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import OrderConfirmation from "../components/OrderConfirmation";
import { vi } from "vitest";

// Mocking the useCookies hook
vi.mock("react-cookie", () => ({
  useCookies: vi.fn(() => [{ token: "mockToken" }, vi.fn()]),
}));

describe("OrderConfirmation component", () => {
  it("renders order confirmation message and buttons", () => {
    render(
      <Router>
        <OrderConfirmation />
      </Router>
    );

    // Asserting the order confirmation message is rendered
    expect(screen.getByText("Thank you for your order.")).toBeInTheDocument();
    expect(
      screen.getByText("A confirmation email will be sent to you shortly.")
    ).toBeInTheDocument();

    // Asserting the 'Manage orders' and 'Continue Shopping' buttons are rendered
    expect(screen.getByText("Manage orders")).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
  });

  it("navigates to dashboard when 'Manage orders' button is clicked", () => {
    const { getByText } = render(
      <Router>
        <OrderConfirmation />
      </Router>
    );

    // Simulating a click on the 'Manage orders' button
    fireEvent.click(getByText("Manage orders"));

    // Asserting the navigation to the dashboard with selectedTab set to "orders"
    expect(window.location.href).toContain("/dashboard?selectedTab=orders");
  });

  it("navigates to shop when 'Continue Shopping' button is clicked", () => {
    const { getByText } = render(
      <Router>
        <OrderConfirmation />
      </Router>
    );

    // Simulating a click on the 'Continue Shopping' button
    fireEvent.click(getByText("Continue Shopping"));

    // Asserting the navigation to the shop
    expect(window.location.href).toContain("/shop");
  });
});
