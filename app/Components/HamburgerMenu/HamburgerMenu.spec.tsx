import { render, screen, fireEvent } from "@testing-library/react";
import HamburgerMenu from "./HamburgerMenu";
test("legacy menu opens and exposes the About Us link", () => {
  render(<HamburgerMenu />);
  fireEvent.click(screen.getByRole("button", { name: /menu/i }));
  expect(
    screen.getByRole("link", { name: "About Us" }),
  ).toHaveAttribute("href", "/about");
});
