import Link from "next/link";
export const metadata = { title: "Booking information" };
export default function TermsPage() {
  return (
    <main className="shell content-page">
      <p className="eyebrow">THE DETAILS MATTER</p>
      <h1>Booking information.</h1>
      <p className="notice">
        This site currently includes a demonstration catalog. Test-mode payments
        do not reserve real travel. The agency must verify its inventory and
        publish its final booking terms before enabling live bookings.
      </p>
      <h2>Packages & prices</h2>
      <p>
        Each trip lists its price, number of travelers per package, departure,
        duration, accommodation, meals, and transportation. Checkout adds 10%
        taxes and fees and shows the final amount in EUR before payment. Only
        services explicitly listed in an offer are included.
      </p>
      <h2>Your booking</h2>
      <p>
        An account and accurate lead traveler details are required. Payment is
        processed by Stripe. Only a verified paid checkout is shown as paid;
        returning to a confirmation URL alone does not confirm a booking.
      </p>
      <h2>Changes & cancellations</h2>
      <p>
        The cancellation policy displayed on your chosen offer applies. Read it
        before continuing. Requests for changes, cancellation, or refunds must
        be made to the agency with the booking reference; they are not
        automatically accepted.
      </p>
      <h2>Travel arrangements</h2>
      <p>
        Check the stated departure and return dates with the agency. Make sure
        each traveler has the documents required for their journey. Optional
        requests, including room preferences, are subject to availability.
      </p>
      <p>
        <Link href="/contact" className="text-link">
          Contact & frequently asked questions
        </Link>
      </p>
    </main>
  );
}
