import { NextResponse } from "next/server";
// Confirmation messages are sent only by the verified Stripe webhook, never from client-supplied payment claims.
export async function POST() {
  return NextResponse.json(
    {
      error: "Booking emails are sent automatically after a verified payment.",
    },
    { status: 405 },
  );
}
