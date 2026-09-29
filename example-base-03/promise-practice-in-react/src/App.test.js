import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders parent shell and route picker", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /parent component/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/select a child/i)).toBeInTheDocument();
});
