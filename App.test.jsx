import { render, screen } from "@testing-library/react";
import App from "./src/App";

describe("App", () => {
  it("should render Hello World", () => {
    render(<App />);
    const message = screen.queryByText(/Hello World/i);
    expect(message).toBeInTheDocument();
  });
});
