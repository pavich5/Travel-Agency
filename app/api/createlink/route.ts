import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { authConfigured } from "@/app/lib/config";
import { checkoutSchema, getStripe, bookingsEnabled } from "@/app/lib/checkout";
import { findOffer, bookingPrice, isBookable } from "@/app/lib/catalog";
export async function POST(req: Request) {
  if (!authConfigured)
    return NextResponse.json(
      { error: "Account sign-in is not configured yet." },
      { status: 503 },
    );
  try {
    const user = await currentUser();
    if (!user)
      return NextResponse.json(
        { error: "Please sign in to book your trip." },
        { status: 401 },
      );
    const parsed = checkoutSchema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          error:
            "Please check your traveler details and accept the booking terms.",
        },
        { status: 400 },
      );
    const data = parsed.data;
    const offer = findOffer(data.offerId);
    if (!offer)
      return NextResponse.json(
        { error: "This trip could not be found." },
        { status: 404 },
      );
    if (!isBookable(offer))
      return NextResponse.json(
        { error: "This departure is no longer available." },
        { status: 409 },
      );
    if (!bookingsEnabled())
      return NextResponse.json(
        { error: "Online booking is being set up. Please contact the agency." },
        { status: 503 },
      );
    const email = user.emailAddresses.find(
      (item) => item.id === user.primaryEmailAddressId,
    )?.emailAddress;
    if (!email)
      return NextResponse.json(
        {
          error: "Add a primary email address to your account before booking.",
        },
        { status: 400 },
      );
    const price = bookingPrice(offer, data.packages);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      client_reference_id: user.id,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${offer.hotelName} — ${offer.hotelCity}`,
              description: `${offer.duration} · ${data.packages} package(s) · ${price.travelers} traveler(s). Includes 10% taxes and fees.`,
            },
            unit_amount: price.total,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        offerId: String(offer.id),
        packages: String(data.packages),
        travelers: String(price.travelers),
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        notes: data.notes,
        termsAcceptedAt: new Date().toISOString(),
      },
      success_url: `${appUrl}/booking/confirmed/${offer.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancelled?offerId=${offer.id}&packages=${data.packages}`,
    });
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    if (error instanceof SyntaxError)
      return NextResponse.json(
        { error: "Invalid checkout request." },
        { status: 400 },
      );
    console.error("Checkout could not be created.");
    return NextResponse.json(
      { error: "We couldn’t open checkout. Please try again shortly." },
      { status: 500 },
    );
  }
}
