import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
test("season routes accept existing lowercase URLs", () => {
  render(<Page params={{ type: "winter" }} />);
  expect(screen.getByLabelText("Collection")).toHaveValue("Winter");
  expect(screen.getByRole("status")).toHaveTextContent("9 escapes");
});
test("empty results can be reset", () => {
  render(<Page params={{ type: "Winter" }} />);
  fireEvent.change(
    screen.getByLabelText("Search destinations, cities or hotels"),
    { target: { value: "impossible-destination" } },
  );
  expect(screen.getByRole("status")).toHaveTextContent("0 escapes");
  fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getByRole("status")).toHaveTextContent("29 escapes");
});
