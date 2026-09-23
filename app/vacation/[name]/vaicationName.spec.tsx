import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
test("destination names are case-insensitive and filter trips", () => {
  render(<Page params={{ name: "greece" }} />);
  expect(screen.getByLabelText("Destination")).toHaveValue("Greece");
  expect(screen.getByRole("status")).toHaveTextContent("2 escapes");
  fireEvent.change(
    screen.getByLabelText("Search destinations, cities or hotels"),
    { target: { value: "Santorini" } },
  );
  expect(screen.getByRole("status")).toHaveTextContent("1 escape");
});
test("unknown destination returns not found", () => {
  expect(() => Page({ params: { name: "Nowhere" } })).toThrow("NEXT_NOT_FOUND");
});
