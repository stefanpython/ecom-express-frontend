import { render, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../components/Signup";
import { useNavigate } from "react-router-dom";
import { vi } from "vitest";

// Mock the useNavigate hook
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  Link: vi.fn(),
}));

describe("Signup component", () => {
  it("updates state when input fields change", () => {
    const { getByPlaceholderText } = render(<Signup />);

    fireEvent.change(getByPlaceholderText("Enter Your Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByPlaceholderText("Confirm Your Password"), {
      target: { value: "password" },
    });

    expect(getByPlaceholderText("Enter Your Email address").value).toBe(
      "test@example.com"
    );
    expect(getByPlaceholderText("Enter Your First Name").value).toBe("John");
    expect(getByPlaceholderText("Enter Your Last Name").value).toBe("Doe");
    expect(getByPlaceholderText("Enter Your Password").value).toBe("password");
    expect(getByPlaceholderText("Confirm Your Password").value).toBe(
      "password"
    );
  });

  it("displays error messages when required fields are empty", () => {
    const { getByText } = render(<Signup />);

    fireEvent.click(getByText("SignUp"));

    expect(getByText("Email is required")).toBeInTheDocument();
    expect(getByText("First Name is required")).toBeInTheDocument();
    expect(getByText("Last Name is required")).toBeInTheDocument();
    expect(getByText("Password is required")).toBeInTheDocument();
    expect(getByText("Confirmation is required")).toBeInTheDocument();
  });

  it("displays error message when confirmation password does not match", () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);

    fireEvent.change(getByPlaceholderText("Enter Your Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByPlaceholderText("Confirm Your Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(getByText("SignUp"));

    expect(
      getByText("Confirmation does not match password")
    ).toBeInTheDocument();
  });

  it("makes API request on form submission", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ savedUser: { id: "123" } }),
      })
    );

    const { getByPlaceholderText, getByText } = render(<Signup />);

    fireEvent.change(getByPlaceholderText("Enter Your Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByPlaceholderText("Enter Your Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByPlaceholderText("Confirm Your Password"), {
      target: { value: "password" },
    });

    fireEvent.click(getByText("SignUp"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3000/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          firstName: "John",
          lastName: "Doe",
          password: "password",
          confirmPassword: "password",
        }),
      });
    });
  });
});
