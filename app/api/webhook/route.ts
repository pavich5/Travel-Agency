import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Resend } from "resend";
import PaymentConfirmationEmail from "../../Components/emails/PaymentConfirmationEmail";

// const resend = new Resend(process.env.RESEND_API_KEY);
// try {
//   await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: [String(user.primaryEmailAddress?.emailAddress)],
//     subject: 'Booking Confirmation Globetrotter',
//     react: PaymentConfirmationEmail({
//       emailAddress:String(user.primaryEmailAddress?.emailAddress),
//       fullName: String(user.fullName)
//     }, {
//       amount: `$${(paymentIntent.amount_total / 100).toFixed(2)}`,
//       destination: event.data.object.metadata.hotelCity,
//       checkinDate: event.data.object.metadata.startDate,
//       checkoutDate: event.data.object.metadata.endDate,
//     }),
//   });
//   console.log('Email sent successfully to',String(user.primaryEmailAddress?.emailAddress))
// } catch (error) {
//   console.error('Failed to send email:', error);
// }
export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const event = await req.json();
      let response = {};
      switch (event.type) {
        case "checkout.session.completed":
          if (event.data.object.metadata.userId) {
            const paymentIntent = event.data.object;
            const userId = event.data.object.metadata.userId;
            const user = await clerkClient.users.getUser(userId);
            const currentUnsafeMetadata = user.unsafeMetadata || {};
            const allPayments = currentUnsafeMetadata.allPayments || [];

            //@ts-ignore
            allPayments.push({
              offerId:event.data.object.metadata.offerId,
              created: paymentIntent.created,
              payment_method_types: paymentIntent.payment_method_types,
            });
            await clerkClient.users.updateUser(userId, {
              unsafeMetadata: { allPayments },
            });

            response = paymentIntent;
          }
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          response = paymentIntent;
          break;
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          response = paymentMethod;
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
          response = { error: `Unhandled event type ${event.type}` };
      }
      return new NextResponse(JSON.stringify(response));
    } catch (error) {
      console.error("Error handling webhook:", error);
      return new NextResponse();
    }
  } else {
    return new NextResponse();
  }
}
