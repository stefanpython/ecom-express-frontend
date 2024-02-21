import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Cart from "../components/Cart";
import { vi } from "vitest";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";

describe("Cart component", () => {
  // Test 1: Rendering of cart items
  it("renders cart items correctly", () => {
    const cartItems = [
      {
        _id: 1,
        product: { name: "Product 1", image: "product1.jpg", price: 10 },
        quantity: 2,
      },
      {
        _id: 2,
        product: { name: "Product 2", image: "product2.jpg", price: 15 },
        quantity: 1,
      },
    ];
    const { getByText } = render(
      <Router>
        <Cart cartItems={cartItems} />
      </Router>
    );

    expect(getByText("Product 1")).toBeInTheDocument();
    expect(getByText("Product 2")).toBeInTheDocument();
  });

  //   it("removes items from the cart", async () => {
  //     // Arrange
  //     const cartItems = [
  //       {
  //         _id: 1,
  //         product: { _id: 123, name: "Product 1", price: 10 },
  //         quantity: 2,
  //       },
  //     ];

  //     // Act
  //     render(
  //       <Router>
  //         <Cart cartItems={cartItems} />
  //       </Router>
  //     );

  //     // Assert initial state
  //     const item1 = screen.getByText("Product 1");
  //     expect(item1).toBeInTheDocument();

  //     // Act - Click the remove button
  //     const removeButton = screen.getByTestId(`remove-button`);
  //     fireEvent.click(removeButton);

  //     // Assert after removal
  //     await waitFor(() => {
  //       expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  //       expect(screen.getByText("Total: $0")).toBeInTheDocument();
  //     });
  //   });

  // Test 3: Placing an order
  it("places an order successfully", async () => {
    const onCloseMock = vi.fn();
    const cartItems = [
      {
        _id: 1,
        product: { name: "Product 1", image: "product1.jpg", price: 10 },
        quantity: 2,
      },
      {
        _id: 2,
        product: { name: "Product 2", image: "product2.jpg", price: 15 },
        quantity: 1,
      },
    ];
    const { getByRole, getByText } = render(
      <Router>
        <Cart cartItems={cartItems} onClose={onCloseMock} />
      </Router>
    );
    const placeOrderButton = getByRole("button", { name: /Place Order/i });

    fireEvent.click(placeOrderButton);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
      expect(localStorage.getItem("pendingOrder")).toBeTruthy();
    });
  });

  //   // Test 5: Closing the cart when clicking outside
  //   it("closes the cart when clicking outside", async () => {
  //     const onCloseMock = vi.fn();
  //     render(
  //       <MemoryRouter>
  //         <Cart isCartOpen={true} onClose={onCloseMock} />
  //       </MemoryRouter>
  //     );

  //     // Wait for the component to finish rendering
  //     await waitFor(() => {
  //       // Find the "Place Order" button using a flexible text matching approach
  //       const placeOrderButton = screen.getByRole("button", {
  //         name: /place order/i,
  //       });

  //       // Click on the "Place Order" button
  //       fireEvent.click(placeOrderButton);
  //     });

  //     // Ensure that the onCloseMock function is called
  //     expect(onCloseMock).toHaveBeenCalled();
  //   });

  // Test 5: Closing the cart when clicking outside
  it("closes the cart when clicking outside", async () => {
    const onCloseMock = vi.fn();
    const { container } = render(
      <Router>
        <Cart isCartOpen={true} onClose={onCloseMock} />
      </Router>
    );

    // Get an element outside of the cart container
    const outsideElement = document.body;

    fireEvent.mouseDown(outsideElement);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
