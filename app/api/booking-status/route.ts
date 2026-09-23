import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { authConfigured } from "@/app/lib/config";
import { getStripe } from "@/app/lib/checkout";
import { findOffer } from "@/app/lib/catalog";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (!authConfigured)
    return NextResponse.json(
      { error: "Sign-in is not configured." },
      { status: 503 },
    );
  const { userId } = auth();
  if (!userId)
    return NextResponse.json(
      { error: "Please sign in to view your booking." },
      { status: 401 },
    );
  const id = new URL(req.url).searchParams.get("session_id");
  if (!id?.startsWith("cs_") || id.length > 300)
    return NextResponse.json(
      { error: "A valid checkout reference is required." },
      { status: 400 },
    );
  try {
    const session = await getStripe().checkout.sessions.retrieve(id);
    if (session.metadata?.userId !== userId)
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 },
      );
    const offer = findOffer(session.metadata?.offerId || "");
    return NextResponse.json({
      paid: session.payment_status === "paid",
      id: session.id,
      offerId: offer?.id,
      hotelName: offer?.hotelName,
      hotelCity: offer?.hotelCity,
      total: session.amount_total,
      currency: session.currency,
      travelers: Number(session.metadata?.travelers || 1),
      email: session.customer_details?.email,
      created: session.created,
      testMode: !session.livemode,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "We couldn’t verify this booking. Please retry or check My trips.",
      },
      { status: 502 },
    );
  }
}
