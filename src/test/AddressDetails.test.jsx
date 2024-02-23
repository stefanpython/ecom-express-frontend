import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddressDetails from "../components/dashboard/AddressDetails";
import { vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}), // Mock the response data as needed
  })
);

// Mock useCookies hook to provide token value
vi.mock("react-cookie", () => ({
  useCookies: () => [{ token: "mock-token-value" }, () => {}],
}));

// Mock the window.alert function
let alertMock;
beforeEach(() => {
  alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  alertMock.mockRestore();
});

describe("AddressDetails component", () => {
  beforeEach(() => {
    // Clear fetch mock calls before each test
    global.fetch.mockClear();
  });

  it("renders the component", () => {
    render(
      <Router>
        <AddressDetails />
      </Router>
    );
    expect(screen.getByText("Address Details")).toBeInTheDocument();
  });

  it("updates input fields on change", () => {
    render(
      <Router>
        <AddressDetails />
      </Router>
    );
    const addressLineInput = screen.getByLabelText("Address Line");
    const postalCodeInput = screen.getByLabelText("Postal/Zip Code");
    const phoneInput = screen.getByLabelText("Phone");

    fireEvent.change(addressLineInput, { target: { value: "123 Main St" } });
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });
    fireEvent.change(phoneInput, { target: { value: "555-123-4567" } });

    expect(addressLineInput).toHaveValue("123 Main St");
    expect(postalCodeInput).toHaveValue("12345");
    expect(phoneInput).toHaveValue("555-123-4567");
  });

  it("submits form data and makes API call on save", async () => {
    render(
      <Router>
        <AddressDetails />
      </Router>
    );

    const addressLineInput = screen.getByLabelText("Address Line");
    const postalCodeInput = screen.getByLabelText("Postal/Zip Code");
    const phoneInput = screen.getByLabelText("Phone");

    fireEvent.change(addressLineInput, { target: { value: "123 Main St" } });
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });
    fireEvent.change(phoneInput, { target: { value: "555-123-4567" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await screen.findByText("Back to orders");

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:3000/update_address/undefined`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-token-value", // Adjust token value as needed
        },
        body: JSON.stringify({
          addressLine: "123 Main St",
          postalCode: "12345",
          phone: "555-123-4567",
        }),
      }
    );
  });
});
