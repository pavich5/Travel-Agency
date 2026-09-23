import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TravelAI from "./page";
beforeEach(() => {
  localStorage.clear();
});
test("corrupt saved chat does not prevent rendering", () => {
  localStorage.setItem("globetrotter-chat", "not-json");
  render(<TravelAI />);
  expect(screen.getByText(/Hello, curious traveler/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
});
test("a message renders the reply and stores the conversation", async () => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({
      ok: true,
      json: async () => ({
        output: {
          role: "assistant",
          content: "Greece has two lovely escapes.",
        },
        mode: "catalog",
      }),
    });
  render(<TravelAI />);
  fireEvent.change(screen.getByLabelText("Message your travel planner"), {
    target: { value: "Greece" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send" }));
  await waitFor(() =>
    expect(
      screen.getByText(/Greece has two lovely escapes/),
    ).toBeInTheDocument(),
  );
  expect(localStorage.getItem("globetrotter-chat")).toContain(
    "Greece has two lovely escapes",
  );
  fireEvent.click(screen.getByRole("button", { name: "New conversation" }));
  expect(
    screen.queryByText(/Greece has two lovely escapes/),
  ).not.toBeInTheDocument();
});
test("network errors are visible to travelers", async () => {
  global.fetch = jest
    .fn()
    .mockRejectedValue(new Error("Connection unavailable"));
  render(<TravelAI />);
  fireEvent.click(screen.getByRole("button", { name: /A mountain getaway/ }));
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Connection unavailable",
    ),
  );
});
