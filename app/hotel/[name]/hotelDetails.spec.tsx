import { render, screen } from "@testing-library/react";
import Page from "./page";
import { offers } from "@/app/lib/catalog";
test("hotel URLs support encoded names and retain booking", () => {
  const offer = offers[0];
  render(<Page params={{ name: encodeURIComponent(offer.hotelName) }} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    offer.hotelName,
  );
  expect(
    screen.getByRole("link", { name: "Let’s make it happen" }),
  ).toHaveAttribute("href", `/booking/confirmation/${offer.id}?packages=1`);
});
test("missing hotel renders a 404 instead of an endless spinner", () => {
  expect(() => Page({ params: { name: "Unknown Hotel" } })).toThrow(
    "NEXT_NOT_FOUND",
  );
});
