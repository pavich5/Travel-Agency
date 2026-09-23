import { render, screen, fireEvent } from "@testing-library/react";
import { TravelProvider } from "./TravelProvider";
import OfferExplorer from "./OfferExplorer";
beforeEach(() => localStorage.clear());
test("saved trips survive reload and can be removed", () => {
  localStorage.setItem("globetrotter-saved", JSON.stringify([222]));
  render(
    <TravelProvider>
      <OfferExplorer savedOnly />
    </TravelProvider>,
  );
  expect(screen.getByRole("status")).toHaveTextContent("1 escape");
  fireEvent.click(screen.getByRole("button", { name: "Unsave trip" }));
  expect(screen.getByText("Your wishlist awaits.")).toBeInTheDocument();
  expect(localStorage.getItem("globetrotter-saved")).toBe("[]");
});
