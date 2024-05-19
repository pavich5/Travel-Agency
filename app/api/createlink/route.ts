import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

async function createStripeSession(req: Request) {
  try {
    const { item, qty, price, email, userId } = await req.json();
    console.log("pavic item",item)
    const quantity = parseInt(qty);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.hotelName,
              description: item.roomType + " for " + item.person + " person",
              images: [
                "https://images-platform.99static.com/zudNWGHtYiWa-sqd5jqXyVt6wBE=/0x0:1773x1773/500x500/top/smart/99designs-contests-attachments/133/133463/attachment_133463156",
              ],
            },
            unit_amount: price,
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      metadata: {
        userId: userId,
        hotelName:item.hotelName,
        countryName:item.countryName,
        startDate:item.startDate,
        location:item.location,
        endDate:item.endDate,
        hotelCity:item.hotelCity,
        duration:item.duration,
        qty: qty,
        price:price,
        offerImage:item.offerImage
      },
      success_url: `http://localhost:3000/booking/confirmed/${
        item.id
      }?email=${email}&hotelName=${encodeURIComponent(
        item.hotelName
      )}&hotelCity=${encodeURIComponent(item.hotelCity)}&bookingId=${item.id}`,
      cancel_url: "https://travel-agency-plum.vercel.app/cancelled",
    });

    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Content-Type", "application/json");

    return new Response(JSON.stringify(session), {
      headers, 
    });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return new Response(null, { status: 500 });
  }
}

export { createStripeSession as POST };
