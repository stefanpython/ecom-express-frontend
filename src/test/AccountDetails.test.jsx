import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AccountDetails from "../components/dashboard/AccountDetails";
import { vi } from "vitest";

// Mock cookies
const mockCookies = {
  token: "mock-token-value",
};

describe("AccountDetails component", () => {
  vi.mock("react-cookie", () => ({
    useCookies: () => [mockCookies, vi.fn(), vi.fn()],
  }));

  // Mock fetch
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({ user: { firstName: "John", lastName: "Doe" } }),
    })
  );

  it("renders without crashing", () => {
    render(<AccountDetails />);
  });

  it("displays empty input fields initially", () => {
    render(<AccountDetails />);
    expect(screen.getByPlaceholderText("Enter your first name")).toHaveValue(
      ""
    );
    expect(screen.getByPlaceholderText("Enter your last name")).toHaveValue("");
  });

  it("updates first name input field correctly", () => {
    render(<AccountDetails />);
    const firstNameInput = screen.getByPlaceholderText("Enter your first name");
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    expect(firstNameInput).toHaveValue("Jane");
  });

  it("updates last name input field correctly", () => {
    render(<AccountDetails />);
    const lastNameInput = screen.getByPlaceholderText("Enter your last name");
    fireEvent.change(lastNameInput, { target: { value: "Smith" } });
    expect(lastNameInput).toHaveValue("Smith");
  });

  //   it("submits form with user details", async () => {
  //     // Mock fetch function to resolve with a successful response
  //     vi.spyOn(global, "fetch").mockResolvedValueOnce({
  //       ok: true,
  //       json: () => Promise.resolve(),
  //     });

  //     render(<AccountDetails setRefreshUser={() => {}} refreshUser={false} />);

  //     // Simulate user input
  //     const firstNameInput = screen.getByPlaceholderText("Enter your first name");
  //     const lastNameInput = screen.getByPlaceholderText("Enter your last name");
  //     fireEvent.change(firstNameInput, { target: { value: "Jane" } });
  //     fireEvent.change(lastNameInput, { target: { value: "Smith" } });

  //     // Simulate form submission
  //     const submitButton = screen.getByText("Save Changes");
  //     fireEvent.click(submitButton);

  //     // Wait for form submission to complete
  //     await waitFor(() => {
  //       // Assert that fetch is called with the correct arguments
  //       expect(global.fetch).toHaveBeenCalledWith(
  //         "http://localhost:3000/user/update/mock-user-id", // Adjust URL as needed
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer mock-token-value`, // Adjust token value as needed
  //           },
  //           body: JSON.stringify({ firstName: "Jane", lastName: "Smith" }),
  //         }
  //       );
  //     });
  //   });

  //   it("handles API errors properly", async () => {
  //     global.fetch.mockImplementationOnce(() =>
  //       Promise.reject(new Error("API Error"))
  //     );
  //     const consoleErrorSpy = vi
  //       .spyOn(console, "error")
  //       .mockImplementation(() => {});
  //     render(<AccountDetails />);
  //     const submitButton = screen.getByText("Save Changes");
  //     fireEvent.click(submitButton);
  //     await waitFor(() => {
  //       expect(consoleErrorSpy).toHaveBeenCalledWith("Saving details failed");
  //       expect.any(Error);
  //     });
  //     consoleErrorSpy.mockRestore();
  //   });
});
