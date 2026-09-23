import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
test("navigation keeps destination, journal and authentication entry points", () => {
  render(<Header />);
  expect(
    screen.getByRole("link", { name: "Globetrotter home" }),
  ).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute(
    "href",
    "/sign-in",
  );
  expect(screen.getByRole("link", { name: "Travel journal" })).toHaveAttribute(
    "href",
    "/blogs",
  );
});
test("mobile menu opens and closes with Escape", () => {
  render(<Header />);
  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
