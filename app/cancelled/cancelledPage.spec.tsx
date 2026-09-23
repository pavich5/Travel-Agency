import { render, screen } from "@testing-library/react";
import Page from "./page";
test("cancelled checkout can resume with the same package count", () => {
  render(<Page searchParams={{ offerId: "222", packages: "2" }} />);
  expect(
    screen.getByRole("link", { name: "Return to booking" }),
  ).toHaveAttribute("href", "/booking/confirmation/222?packages=2");
  expect(screen.getByText(/hasn’t been booked/)).toBeInTheDocument();
});
test("unknown trip still has a usable exit", () => {
  render(<Page searchParams={{ offerId: "-1" }} />);
  expect(
    screen.queryByRole("link", { name: "Return to booking" }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Explore other trips" }),
  ).toHaveAttribute("href", "/offers");
});
