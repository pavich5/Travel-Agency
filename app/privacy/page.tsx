import Link from "next/link";
export const metadata = { title: "Privacy information" };
export default function PrivacyPage() {
  return (
    <main className="shell content-page">
      <p className="eyebrow">YOUR DETAILS, EXPLAINED</p>
      <h1>Privacy information.</h1>
      <p>
        This page describes how this application handles information. The agency
        must add its legal identity, contact details, retention periods, and
        applicable privacy terms before accepting live bookings.
      </p>
      <h2>Accounts</h2>
      <p>
        When enabled, Clerk manages authentication and your account profile. The
        application uses your signed-in account and primary email to associate
        bookings with you.
      </p>
      <h2>Bookings & payments</h2>
      <p>
        Checkout sends your lead traveler name, phone, optional requests,
        account identifier, and trip details to Stripe to process and associate
        the booking. Card details are entered directly in Stripe checkout. The
        application does not store card numbers. When configured, Mailjet sends
        confirmation emails.
      </p>
      <h2>Saved trips & your planner</h2>
      <p>
        Saved trip identifiers and travel planner conversations are stored in
        your browser on this device. You can remove saved trips using the heart
        buttons and clear planner history using New conversation. Browser
        storage can also be cleared through your browser settings.
      </p>
      <h2>Travel planner</h2>
      <p>
        When AI is enabled, submitted conversation text is sent to OpenAI to
        generate travel suggestions. Avoid entering payment details or sensitive
        personal information. Without AI credentials, the planner uses the local
        trip catalog instead.
      </p>
      <h2>Contact</h2>
      <p>
        For questions about your account or booking information, use the
        agency’s contact details when available on the{" "}
        <Link href="/contact" className="text-link">
          contact page
        </Link>
        .
      </p>
    </main>
  );
}
