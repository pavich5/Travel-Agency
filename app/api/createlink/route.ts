import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_ACCESS_KEY ?? '');

async function createStripeSession(req: Request) {
  try {
    const { item, qty, price,email } = await req.json();
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
                'https://images-platform.99static.com/zudNWGHtYiWa-sqd5jqXyVt6wBE=/0x0:1773x1773/500x500/top/smart/99designs-contests-attachments/133/133463/attachment_133463156'
            ],

            },
            unit_amount: price,
            
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: `https://travel-agency-2.vercel.app/booking/confirmed/${item.id}?email=${email}&hotelName=${encodeURIComponent(item.hotelName)}&hotelCity=${encodeURIComponent(item.hotelCity)}`,
      cancel_url: "https://travel-agency-2.vercel.app/cancelled",
    });
    return new Response(JSON.stringify(session));
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return new Response();
  }
}

export { createStripeSession as POST };
