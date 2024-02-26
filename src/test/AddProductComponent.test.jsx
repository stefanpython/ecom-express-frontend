import { render, fireEvent, waitFor } from "@testing-library/react";
import AddProduct from "../components/admin/AddProduct";
import { vi } from "vitest";

// Mock fetch function
global.fetch = vi.fn();

// Mock useCookies hook
vi.mock("react-cookie", () => ({
  useCookies: () => [{ token: "mock-token-value" }, () => {}],
}));

it("submits form with correct data", async () => {
  // Mock fetch response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ message: "Product successfully added!" }),
  });

  // Render the component
  const { getByPlaceholderText, getByLabelText, getByRole } = render(
    <AddProduct />
  );

  // Fill in form fields
  fireEvent.change(getByPlaceholderText("Enter product name"), {
    target: { value: "Test Product" },
  });
  fireEvent.change(getByPlaceholderText("Enter product description"), {
    target: { value: "Test Description" },
  });
  fireEvent.change(getByPlaceholderText("Enter product price"), {
    target: { value: "10.99" },
  });
  fireEvent.change(getByPlaceholderText("Enter product quantity"), {
    target: { value: "100" },
  });
  fireEvent.change(getByLabelText("Category"), {
    target: { value: "category-id-1" },
  });

  // Mock file object
  const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
  fireEvent.change(getByLabelText("Image"), { target: { files: [file] } });

  const addButton = getByRole("button", { name: /add product/i });

  // Submit the form
  fireEvent.click(addButton);

  // Wait for form submission to complete
  await waitFor(() => {
    // Check if fetch is called with correct data
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/create_product", {
      method: "POST",
      headers: {
        Authorization: "Bearer mock-token-value",
      },
      body: expect.any(FormData), // We expect FormData to be used for file upload
    });

    // Check if form fields are reset after submission
    expect(getByPlaceholderText("Enter product name").value).toBe("");
    expect(getByPlaceholderText("Enter product description").value).toBe("");
    expect(getByPlaceholderText("Enter product price").value).toBe("");
    expect(getByPlaceholderText("Enter product quantity").value).toBe("");
    expect(getByLabelText("Category").value).toBe("");
    expect(getByLabelText("Image").files[0]).toBe(undefined); // Check if file input is cleared

    // Check if alert is shown
    expect(window.alert).toHaveBeenCalledWith("Product successfully added!");
  });
});
