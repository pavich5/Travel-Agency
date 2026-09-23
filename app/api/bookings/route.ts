import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { authConfigured } from "@/app/lib/config";
import { getStripe } from "@/app/lib/checkout";
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
      { error: "Please sign in to see your bookings." },
      { status: 401 },
    );
  const cursor = new URL(req.url).searchParams.get("cursor");
  if (cursor && (!/^cs_[a-zA-Z0-9_]+$/.test(cursor) || cursor.length > 300))
    return NextResponse.json(
      { error: "Invalid booking page." },
      { status: 400 },
    );
  try {
    // Read existing checkout records; no new customer metadata is sent to Stripe.
    // Filter on the server so only the authenticated user's paid bookings leave this endpoint.
    const sessions = await getStripe().checkout.sessions.list({
      limit: 100,
      ...(cursor ? { starting_after: cursor } : {}),
    });
    const bookings = sessions.data
      .filter(
        (session) =>
          session.metadata?.userId === userId &&
          session.payment_status === "paid",
      )
      .map((session) => ({
        id: session.id,
        offerId: Number(session.metadata?.offerId),
        created: session.created,
        amount: session.amount_total || 0,
        currency: session.currency,
        travelers: Number(session.metadata?.travelers || 1),
        testMode: !session.livemode,
      }));
    return NextResponse.json({
      bookings,
      nextCursor: sessions.has_more ? sessions.data.at(-1)?.id : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Your bookings could not be loaded. Please try again shortly." },
      { status: 503 },
    );
  }
}
