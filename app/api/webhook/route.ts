import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/app/lib/checkout";
import { sendEmail } from "../sendEmail";
import { findOffer, money } from "@/app/lib/catalog";
import { dbConnect } from "../lib/db";
import BookingReceipt from "../models/BookingReceipt";
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || secret.includes("your_"))
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 503 },
    );
  const signature = req.headers.get("stripe-signature");
  if (!signature)
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await req.text(),
      signature,
      secret,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }
  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  )
    return NextResponse.json({ received: true });
  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid" || !session.metadata?.userId)
    return NextResponse.json({ received: true });
  // Booking history reads existing Stripe checkout records. No client-writable profile data is proof of payment.
  if (
    process.env.MAILJET_API &&
    !process.env.MAILJET_API.includes("your_") &&
    process.env.MAILJET_SECRET_KEY &&
    process.env.MAIL_FROM_EMAIL &&
    process.env.MONGODB_URL
  ) {
    let claimed = false;
    try {
      await dbConnect();
      await BookingReceipt.init();
      const existing = await BookingReceipt.findOne({ sessionId: session.id });
      if (existing?.status === "sent")
        return NextResponse.json({ received: true });
      try {
        const receipt = await BookingReceipt.findOneAndUpdate(
          {
            sessionId: session.id,
            $or: [{ status: "failed" }, { leaseUntil: { $lt: new Date() } }],
          },
          {
            $set: {
              status: "processing",
              leaseUntil: new Date(Date.now() + 120000),
            },
          },
          { upsert: true, new: true },
        );
        claimed = !!receipt;
      } catch (error) {
        if ((error as { code?: number }).code === 11000)
          return NextResponse.json(
            { error: "Confirmation is processing; retry shortly." },
            { status: 503 },
          );
        throw error;
      }
      const offer = findOffer(session.metadata.offerId);
      const email = session.customer_details?.email || session.customer_email;
      if (claimed && offer && email) {
        await sendEmail(
          email,
          "Your Globetrotter booking",
          `Your payment of ${money((session.amount_total || 0) / 100)} for ${offer.hotelName} in ${offer.hotelCity} has been received. Reference: ${session.id}.`,
          session.metadata.firstName || "Traveler",
          String(offer.id),
        );
      }
      await BookingReceipt.updateOne(
        { sessionId: session.id },
        { $set: { status: "sent" } },
      );
    } catch {
      if (claimed)
        await BookingReceipt.updateOne(
          { sessionId: session.id },
          { $set: { status: "failed" } },
        ).catch(() => {});
      console.error("Booking email failed; webhook retry requested.");
      return NextResponse.json(
        { error: "Confirmation delivery failed." },
        { status: 500 },
      );
    }
  }
  return NextResponse.json({ received: true });
}
