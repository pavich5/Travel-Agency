import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
test("group changes update the total and checkout link together", () => {
  render(<Page params={{ id: "222" }} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Santorini",
  );
  expect(screen.getByText("€1,100")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Your group"), {
    target: { value: "2" },
  });
  expect(screen.getByText("€2,200")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Let’s make it happen" }),
  ).toHaveAttribute("href", "/booking/confirmation/222?packages=2");
});
test("unknown offers return not found", () => {
  expect(() => Page({ params: { id: "-1" } })).toThrow("NEXT_NOT_FOUND");
});
