import Link from "next/link";
import Icon from "../Components/travel/Icon";
export const metadata = { title: "Contact & FAQs" };
const faqs = [
  {
    q: "What’s included in my trip?",
    a: "Each offer lists its hotel, room, meal plan, transportation, and activities. Flights are included only if the offer explicitly says so. Check the trip details before booking.",
  },
  {
    q: "Is the price per person?",
    a: "The price shown is per package. Some packages cover one traveler and others cover two. The offer and checkout show the number of travelers, package subtotal, 10% taxes and fees, and your final total in euros.",
  },
  {
    q: "How does payment work?",
    a: "Sign in, enter the lead traveler’s details, and continue to Stripe’s secure checkout. After payment, the site verifies your checkout reference. Your booking appears in My trips once Stripe has processed it.",
  },
  {
    q: "Can I cancel or change my trip?",
    a: "Every offer has its own cancellation policy, including deadlines and charges. Contact the agency with your booking reference to request a change or cancellation. A request does not automatically cancel or refund a booking.",
  },
  {
    q: "Where can I find my booking?",
    a: "Open My bookings and sign in with the account used at checkout. Recently completed payments may take a short moment to appear; use Refresh bookings to check again.",
  },
  {
    q: "Can I save trips for later?",
    a: "Tap the heart on a trip to add it to Saved trips. Your list stays in this browser on this device. Clearing browser storage removes it.",
  },
];
export default function ContactPage() {
  const email = process.env.CONTACT_EMAIL;
  const viber = process.env.NEXT_PUBLIC_VIBER_NUMBER;
  return (
    <main className="shell content-page">
      <p className="eyebrow">A LITTLE HELP ALONG THE WAY</p>
      <h1>
        Good journeys start
        <br />
        <em>with a conversation.</em>
      </h1>
      <p>
        Have a question about a destination, a stay, or a booking? Start with
        the answers below.
      </p>
      <div
        style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBlock: 25 }}
      >
        {email && (
          <a href={`mailto:${email}`} className="button button-green">
            <Icon name="mail" size={17} />
            Email the agency
          </a>
        )}
        {viber && (
          <a
            href={`viber://chat?number=${encodeURIComponent(viber)}`}
            className="button button-outline"
          >
            Chat on Viber
          </a>
        )}
        <Link href="/trips" className="button button-outline">
          View my bookings <Icon name="arrow" size={17} />
        </Link>
      </div>
      {!email && !viber && (
        <p className="notice">
          Direct agency contact details are being set up. Booking support
          channels will appear here once available.
        </p>
      )}
      <h2>A few things you might be wondering.</h2>
      {faqs.map((faq) => (
        <details className="faq" key={faq.q}>
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      ))}
      <div style={{ marginTop: 35 }}>
        <Link className="text-link" href="/ai">
          Looking for inspiration? Meet your trip planner{" "}
          <Icon name="arrow" size={17} />
        </Link>
      </div>
    </main>
  );
}
