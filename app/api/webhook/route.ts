import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

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
              amount: paymentIntent.amount_total,
              currency: paymentIntent.currency,
              created: paymentIntent.created,
              paymentIntentId: paymentIntent.id,
              payment_method_types: paymentIntent.payment_method_types,
              price: event.data.object.metadata.price,
              hotelName: event.data.object.metadata.hotelName,
              countryName: event.data.object.metadata.countryName,
              startDate: event.data.object.metadata.startDate,
              location: event.data.object.metadata.location,
              endDate: event.data.object.metadata.endDate,
              hotelCity: event.data.object.metadata.hotelCity,
              duration: event.data.object.metadata.duration,
              qty: event.data.object.metadata.qty,
              offerImage: event.data.object.metadata.offerImage,
            });
            const SibApiV3Sdk = require("sib-api-v3-sdk");
            const defaultClient = SibApiV3Sdk.ApiClient.instance;

            let apiKey = defaultClient.authentications["api-key"];
            apiKey.apiKey = process.env.BREVO_API_KEY;

            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
              to: [
                {
                  email: user.emailAddresses,
                  name: user.fullName,
                },
              ],
              sender: {
                email: "pavic.antonio969@gmail.com",
                name: "Globetrotter",
              },
              subject: "Booking Confirmation",
              htmlContent:
                "<html><body><h1>Booking Confirmation</h1><p>Thank you for booking with us!</p></body></html>",
            });

            apiInstance.sendTransacEmail(sendSmtpEmail)

            await clerkClient.users.updateUser(userId, {
              unsafeMetadata: { ...currentUnsafeMetadata, allPayments },
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
