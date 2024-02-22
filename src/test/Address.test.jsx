import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Address from "../components/dashboard/Address";

// Mock user info
const userInfo = { userId: "mock-user-id" };

// Mock useCookies hook to provide token value
vi.mock("react-cookie", () => ({
  useCookies: () => [{ token: "mock-token-value" }, () => {}],
}));

describe("Address component", () => {
  it('renders address form when "Add" button is clicked', async () => {
    render(<Address userInfo={userInfo} />);

    // Simulate click on "Add" button
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    // Check if the address form is displayed
    const addressLineInput = screen.getByPlaceholderText("Enter your address");
    const postalCodeInput = screen.getByPlaceholderText(
      "Enter your postal/zip code"
    );
    const phoneInput = screen.getByPlaceholderText("Enter your phone number");
    const saveButton = screen.getByText("Save Address");
    const cancelButton = screen.getByText("Cancel");

    expect(addressLineInput).toBeInTheDocument();
    expect(postalCodeInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("submits address form with user details", async () => {
    render(<Address userInfo={userInfo} />);

    // Mock fetch function to resolve with a successful response
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(),
    });

    // Simulate click on "Add" button
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    // Simulate user input
    const addressLineInput = screen.getByPlaceholderText("Enter your address");
    const postalCodeInput = screen.getByPlaceholderText(
      "Enter your postal/zip code"
    );
    const phoneInput = screen.getByPlaceholderText("Enter your phone number");
    fireEvent.change(addressLineInput, { target: { value: "123 Main St" } });
    fireEvent.change(postalCodeInput, { target: { value: "12345" } });
    fireEvent.change(phoneInput, { target: { value: "555-123-4567" } });

    // Simulate form submission
    const saveButton = screen.getByText("Save Address");
    fireEvent.click(saveButton);

    // Wait for form submission to complete
    await waitFor(() => {
      // Assert that fetch is called with the correct arguments
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer mock-token-value",
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
});
