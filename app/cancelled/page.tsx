import Link from "next/link";
import Icon from "../Components/travel/Icon";
import { findOffer } from "../lib/catalog";
export default function CancelledPage({
  searchParams,
}: {
  searchParams: { offerId?: string; packages?: string };
}) {
  const offer = findOffer(searchParams.offerId || "");
  const packages = Number(searchParams.packages) || 1;
  return (
    <main className="result-page">
      <div className="success-icon">
        <Icon name="bag" size={30} />
      </div>
      <p className="eyebrow">NO RUSH. THE WORLD CAN WAIT.</p>
      <h1>Your trip is still a possibility.</h1>
      <p>
        Checkout was cancelled. This trip hasn’t been booked. You can return to
        your details whenever you’re ready.
      </p>
      <div className="result-actions">
        {offer && (
          <Link
            className="button button-green"
            href={`/booking/confirmation/${offer.id}?packages=${packages}`}
          >
            Return to booking <Icon name="arrow" size={17} />
          </Link>
        )}
        <Link className="button button-outline" href="/offers">
          Explore other trips
        </Link>
      </div>
    </main>
  );
}
