import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/Login";
import { vi } from "vitest";
import { useNavigate } from "react-router";
import { ReactRouterDOM } from "react-router";

// Mock useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Login component", () => {
  it("renders email and password input fields with labels", () => {
    const { getByLabelText } = render(
      <Router>
        <Login />
      </Router>
    );

    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    const { getByLabelText } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("displays error messages for empty fields on form submission", async () => {
    const { getByText, getByRole } = render(
      <Router>
        <Login />
      </Router>
    );

    const loginButton = getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText(/email is required/i)).toBeInTheDocument();
      expect(getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  // it("redirects to home page after successful login", async () => {
  //   const { getByLabelText, getByText, getByRole } = render(
  //     <Router>
  //       <Login />
  //     </Router>
  //   );

  //   const emailInput = getByLabelText(/email/i);
  //   const passwordInput = getByLabelText(/password/i);
  //   const loginButton = getByRole("button", { name: /login/i });

  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });
  //   fireEvent.click(loginButton);

  //   // Wait for redirection
  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith("/");
  //   });
  // });

  it("handles server error during login", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    );

    const { getByLabelText, getByText, getByRole } = render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const loginButton = getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
