/** @jest-environment node */
import { currentUser, auth } from "@clerk/nextjs";
import { getStripe } from "@/app/lib/checkout";
import { POST as checkout } from "./createlink/route";
import { GET as status } from "./booking-status/route";
import { GET as bookings } from "./bookings/route";
import { POST as webhook } from "./webhook/route";
import Stripe from "stripe";
jest.mock("@/app/lib/config", () => ({ authConfigured: true }));
jest.mock("@clerk/nextjs", () => ({ currentUser: jest.fn(), auth: jest.fn() }));
jest.mock("@/app/lib/checkout", () => ({
  ...jest.requireActual("@/app/lib/checkout"),
  getStripe: jest.fn(),
  bookingsEnabled: () => true,
}));
const mockCreate = jest.fn();
const mockRetrieve = jest.fn();
const mockList = jest.fn();
const user = {
  id: "user_test",
  primaryEmailAddressId: "email_test",
  emailAddresses: [{ id: "email_test", emailAddress: "traveler@example.test" }],
};
const valid = {
  offerId: 222,
  packages: 2,
  firstName: "Test",
  lastName: "Traveler",
  phone: "+389 70123456",
  notes: "",
  acceptedTerms: true,
};
const request = (data: unknown) =>
  new Request("http://localhost:3000/api/createlink", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
beforeEach(() => {
  jest.clearAllMocks();
  (currentUser as jest.Mock).mockResolvedValue(user);
  (auth as jest.Mock).mockReturnValue({ userId: user.id });
  mockCreate.mockResolvedValue({
    id: "cs_test_1",
    url: "https://checkout.stripe.com/test",
  });
  (getStripe as jest.Mock).mockReturnValue({
    checkout: {
      sessions: { create: mockCreate, retrieve: mockRetrieve, list: mockList },
    },
    webhooks: new Stripe("sk_test_example").webhooks,
  });
});
test("checkout ignores client prices and identity, using signed-in user and canonical EUR total", async () => {
  const response = await checkout(
    request({
      ...valid,
      price: 1,
      email: "other@example.test",
      userId: "someone_else",
    }),
  );
  expect(response.status).toBe(200);
  expect(mockCreate).toHaveBeenCalledWith(
    expect.objectContaining({
      customer_email: "traveler@example.test",
      client_reference_id: user.id,
      metadata: expect.objectContaining({
        userId: user.id,
        offerId: "222",
        travelers: "2",
      }),
      line_items: [
        expect.objectContaining({
          quantity: 1,
          price_data: expect.objectContaining({
            currency: "eur",
            unit_amount: 220000,
          }),
        }),
      ],
    }),
  );
});
test("anonymous checkout is rejected", async () => {
  (currentUser as jest.Mock).mockResolvedValue(null);
  expect((await checkout(request(valid))).status).toBe(401);
  expect(mockCreate).not.toHaveBeenCalled();
});
test.each([
  { ...valid, packages: 0 },
  { ...valid, packages: 1.5 },
  { ...valid, acceptedTerms: false },
  { ...valid, phone: "abc" },
])("invalid traveler request cannot create a payment", async (data) => {
  expect((await checkout(request(data))).status).toBe(400);
  expect(mockCreate).not.toHaveBeenCalled();
});
test("unknown offer cannot create a payment", async () => {
  expect(
    (await checkout(request({ ...valid, offerId: 99999999 }))).status,
  ).toBe(404);
  expect(mockCreate).not.toHaveBeenCalled();
});
test("other users cannot inspect a checkout", async () => {
  mockRetrieve.mockResolvedValue({
    metadata: { userId: "someone_else" },
    payment_status: "paid",
  });
  expect(
    (
      await status(
        new Request("http://localhost/api/booking-status?session_id=cs_test_1"),
      )
    ).status,
  ).toBe(404);
});
test("a pending checkout is not reported as paid", async () => {
  mockRetrieve.mockResolvedValue({
    id: "cs_test_1",
    metadata: { userId: user.id, offerId: "222" },
    payment_status: "unpaid",
    amount_total: 220000,
  });
  const response = await status(
    new Request("http://localhost/api/booking-status?session_id=cs_test_1"),
  );
  expect((await response.json()).paid).toBe(false);
});
test("history only returns this user's paid records", async () => {
  mockList.mockResolvedValue({
    has_more: false,
    data: [
      {
        id: "cs_mine",
        metadata: { userId: user.id, offerId: "222" },
        payment_status: "paid",
      },
      { id: "cs_other", metadata: { userId: "other" }, payment_status: "paid" },
      {
        id: "cs_pending",
        metadata: { userId: user.id },
        payment_status: "unpaid",
      },
    ],
  });
  const response = await bookings(new Request("http://localhost/api/bookings"));
  expect(
    (await response.json()).bookings.map((b: { id: string }) => b.id),
  ).toEqual(["cs_mine"]);
});
test("unsigned webhook events are rejected", async () => {
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_unit_test";
  expect(
    (
      await webhook(
        new Request("http://localhost/api/webhook", {
          method: "POST",
          body: JSON.stringify({ type: "checkout.session.completed" }),
        }),
      )
    ).status,
  ).toBe(400);
});
test("tampered signed webhook payload is rejected", async () => {
  const payload = JSON.stringify({ type: "unhandled.event" });
  const stripe = new Stripe("sk_test_example");
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_unit_test";
  const signature = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: "whsec_unit_test",
  });
  const response = await webhook(
    new Request("http://localhost/api/webhook", {
      method: "POST",
      headers: { "stripe-signature": signature },
      body: payload + " ",
    }),
  );
  expect(response.status).toBe(400);
});
test("valid irrelevant webhook is acknowledged", async () => {
  const payload = JSON.stringify({ type: "unhandled.event" });
  const stripe = new Stripe("sk_test_example");
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_unit_test";
  const signature = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: "whsec_unit_test",
  });
  expect(
    (
      await webhook(
        new Request("http://localhost/api/webhook", {
          method: "POST",
          headers: { "stripe-signature": signature },
          body: payload,
        }),
      )
    ).status,
  ).toBe(200);
});
