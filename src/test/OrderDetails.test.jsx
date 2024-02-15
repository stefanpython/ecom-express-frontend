import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderDetails from "../components/OrderDetails";
import { vi } from "vitest";

describe("OrderDetails component", () => {
  const mockOrder = {
    _id: "1",
    createdAt: new Date().toISOString(),
    items: [
      {
        _id: "1",
        product: {
          _id: "1",
          name: "Product 1",
          image: "product1.jpg",
          price: 10.99,
        },
        quantity: 2,
      },
      {
        _id: "2",
        product: {
          _id: "2",
          name: "Product 2",
          image: "product2.jpg",
          price: 20.99,
        },
        quantity: 1,
      },
    ],
    status: "Processing",
  };

  // Create a mock for the cookies object
  const cookies = {
    token: "mockToken",
  };

  const mockFetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockOrder),
    })
  );

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <Router>
        <OrderDetails />
      </Router>
    );
  });

  it("fetches order details on component mount", async () => {
    render(
      <Router>
        <OrderDetails />
      </Router>
    );

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(`http://localhost:3000/order/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer undefined",
        },
      });
    });
  });

  it("displays order details correctly", async () => {
    render(
      <Router>
        <OrderDetails />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(`Order ID`)).toBeInTheDocument();
      expect(screen.getByText(`Order Details`)).toBeInTheDocument();
      expect(screen.getByText(`Order Date`)).toBeInTheDocument();
      expect(screen.getByText(`Order Items`)).toBeInTheDocument();
      expect(screen.getByText(`Status`)).toBeInTheDocument();
      expect(screen.getByText(`Total Quantity`)).toBeInTheDocument();
    });
  });

  // it("cancels an order when cancel button is clicked", async () => {
  //   // Mock necessary dependencies
  //   const mockOrderItems = {
  //     _id: "order_id_1",
  //     items: [
  //       {
  //         _id: "item_id_1",
  //         product: { _id: "product_id_1", name: "Product 1", price: 10 },
  //         quantity: 2,
  //       },
  //     ],
  //     createdAt: new Date().toISOString(),
  //     status: "Pending",
  //   };
  //   const mockNavigate = vi.fn(); // Corrected
  //   const mockUseLocation = vi.fn(() => ({ pathname: "/orders/order_id_1" }));
  //   const mockUseCookies = vi.fn(() => [{ token: "mock_token" }, vi.fn()]);

  //   // Render the component with mocked dependencies
  //   const { getByText } = render(
  //     <Router>
  //       <OrderDetails
  //         navigate={mockNavigate}
  //         useLocation={mockUseLocation}
  //         useCookies={mockUseCookies}
  //       />
  //     </Router>
  //   );

  //   // Mock the fetch request made by handleOrderDetails
  //   global.fetch = vi.fn().mockResolvedValueOnce({
  //     ok: true,
  //     json: () => Promise.resolve(mockOrderItems),
  //   });

  //   // Wait for order details to be loaded
  //   await waitFor(() => {
  //     expect(getByText("Order ID")).toBeInTheDocument();
  //   });

  //   // Mock the fetch request made by handleCancelOrder
  //   global.fetch.mockResolvedValueOnce({
  //     ok: true,
  //   });

  //   // Mock window.confirm
  //   vi.spyOn(window, "confirm").mockImplementation(() => true);

  //   // Click the cancel button
  //   fireEvent.click(getByText("Cancel"));

  //   // Ensure window.confirm is called
  //   expect(window.confirm).toHaveBeenCalled();

  //   // Wait for navigation to dashboard
  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalled(); // Ensure mockNavigate is called
  //     expect(mockNavigate.mock.calls[0][0]).toBe(
  //       "/dashboard?selectedTab=orders"
  //     ); // Ensure correct argument is passed
  //   });

  //   // Ensure fetch is called with correct URL and method
  //   expect(global.fetch).toHaveBeenCalledWith(
  //     "http://localhost:3000/delete_order/order_id_1",
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer mock_token",
  //       },
  //     }
  //   );
  // });
});
