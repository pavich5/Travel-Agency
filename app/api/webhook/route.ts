import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const event = await req.json();
      console.log('pavic event', event);
      let response = {};
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log(paymentIntent);
          response = paymentIntent;
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          response = paymentMethod;
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
          response = { error: `Unhandled event type ${event.type}` };
      }
      return new NextResponse(JSON.stringify(response) );
    } catch (error) {
      console.error('Error handling webhook:', error);
      return new NextResponse();
    }
  } else {
    return new NextResponse();
  }
}
