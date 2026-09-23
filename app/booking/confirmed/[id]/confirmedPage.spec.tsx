import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
afterEach(() => jest.restoreAllMocks());
test("visiting confirmation without a checkout id does not claim success", () => {
  render(<Page params={{ id: "222" }} searchParams={{}} />);
  expect(screen.getByRole("alert")).toHaveTextContent("No checkout reference");
  expect(screen.queryByText(/payment was verified/)).not.toBeInTheDocument();
});
test("another offer's session cannot confirm this trip", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({
      ok: true,
      json: async () => ({ paid: true, offerId: 1, hotelCity: "Zurich" }),
    });
  render(
    <Page
      params={{ id: "222" }}
      searchParams={{ session_id: "cs_test_123" }}
    />,
  );
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent("does not match"),
  );
});
test("verified test payments are clearly identified", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({
      ok: true,
      json: async () => ({
        paid: true,
        offerId: 222,
        id: "cs_test_123",
        hotelCity: "Santorini",
        hotelName: "Santorini Palms Retreat",
        total: 110000,
        travelers: 1,
        testMode: true,
      }),
    });
  render(
    <Page
      params={{ id: "222" }}
      searchParams={{ session_id: "cs_test_123" }}
    />,
  );
  await waitFor(() =>
    expect(
      screen.getByText(/does not reserve accommodation/),
    ).toBeInTheDocument(),
  );
  expect(screen.getByText("€1,100")).toBeInTheDocument();
});
