import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
test("checkout shows consistent group pricing and setup state", () => {
  render(<Page params={{ id: "222" }} searchParams={{ packages: "2" }} />);
  expect(screen.getByLabelText("Your group")).toHaveValue("2");
  expect(screen.getByText("€2,200")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Continue to secure payment" }),
  ).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Your group"), {
    target: { value: "3" },
  });
  expect(screen.getByText("€3,300")).toBeInTheDocument();
});
test("invalid group query falls back to one package", () => {
  render(<Page params={{ id: "222" }} searchParams={{ packages: "-2" }} />);
  expect(screen.getByLabelText("Your group")).toHaveValue("1");
});
