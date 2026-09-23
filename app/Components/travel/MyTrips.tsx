"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authConfigured } from "@/app/lib/config";
import { findOffer, money, formatDate } from "@/app/lib/catalog";
import TravelImage from "./TravelImage";
import Icon from "./Icon";
type Booking = {
  id: string;
  offerId: number;
  created: number;
  amount: number;
  travelers: number;
  testMode: boolean;
};
function AccountTrips() {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [cursor, setCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  useEffect(() => {
    if (!user) {
      setBusy(false);
      return;
    }
    const controller = new AbortController();
    setBusy(true);
    setError("");
    fetch(
      `/api/bookings${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setBookings((current) =>
          cursor
            ? [
                ...current,
                ...data.bookings.filter(
                  (b: Booking) => !current.some((c) => c.id === b.id),
                ),
              ]
            : data.bookings,
        );
        setNextCursor(data.nextCursor || null);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setBusy(false);
      });
    return () => controller.abort();
  }, [user?.id, cursor, attempt]);
  if (!isLoaded) return <p role="status">Loading your account…</p>;
  if (!user) return <SignInPrompt />;
  const legacy = Array.isArray(user.unsafeMetadata?.allPayments)
    ? (user.unsafeMetadata.allPayments as {
        offerId: number;
        created: number;
      }[])
    : [];
  return (
    <>
      <p style={{ marginBottom: 25, color: "var(--muted)" }}>
        Welcome back{user.firstName ? `, ${user.firstName}` : ""}. Here’s what’s
        on your horizon.
      </p>
      {error && (
        <div className="notice error-notice" role="alert">
          {error}
          <br />
          <button
            className="button button-outline"
            style={{ marginTop: 12 }}
            onClick={() => setAttempt((n) => n + 1)}
          >
            Try again
          </button>
        </div>
      )}
      {busy && <p role="status">Finding your bookings…</p>}
      {!busy && !error && !bookings.length && (
        <div className="empty-state">
          <Icon name="bag" size={35} />
          <h2>Your next chapter is unwritten.</h2>
          <p>
            Once you complete a booking, you’ll find it here. Recently paid
            trips can take a short moment to appear.
          </p>
          <Link className="button button-green" href="/offers">
            Find your first escape <Icon name="arrow" size={17} />
          </Link>
          <button
            className="button button-outline"
            style={{ marginLeft: 12 }}
            onClick={() => setAttempt((n) => n + 1)}
          >
            Refresh bookings
          </button>
        </div>
      )}
      {bookings.map((booking) => {
        const offer = findOffer(booking.offerId);
        return (
          <article className="trip-record" key={booking.id}>
            {offer && <TravelImage src={offer.image} alt={offer.hotelCity} />}
            <div>
              <span className="booking-status">
                {booking.testMode ? "Test booking" : "Payment confirmed"}
              </span>
              <h3>{offer?.hotelName || "Your travel booking"}</h3>
              <p>
                {offer
                  ? `${offer.hotelCity} · ${formatDate(offer.startDate)} · ${offer.duration}`
                  : ""}
              </p>
              <p>
                {booking.travelers} travelers · {money(booking.amount / 100)}{" "}
                paid
              </p>
              <p style={{ fontSize: 12, overflowWrap: "anywhere" }}>
                Reference: {booking.id}
              </p>
            </div>
            {offer && (
              <Link
                className="button button-outline"
                href={`/offer/${offer.id}`}
              >
                Trip details <Icon name="arrow" size={16} />
              </Link>
            )}
          </article>
        );
      })}
      {nextCursor && (
        <button
          className="button button-outline"
          disabled={busy}
          onClick={() => setCursor(nextCursor)}
        >
          Load more bookings
        </button>
      )}
      {legacy.length > 0 && (
        <section style={{ marginTop: 35 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            Earlier booking records
          </h2>
          <p className="notice">
            These records were imported from the previous account system.
            Payment status has not been reverified.
          </p>
          {legacy.map((payment, i) => {
            const offer = findOffer(payment.offerId);
            return offer ? (
              <article className="trip-record" key={i}>
                <TravelImage src={offer.image} alt={offer.hotelCity} />
                <div>
                  <h3>{offer.hotelName}</h3>
                  <p>
                    Recorded{" "}
                    {new Date(payment.created * 1000).toLocaleDateString(
                      "en-GB",
                    )}
                  </p>
                </div>
                <Link
                  className="button button-outline"
                  href={`/offer/${offer.id}`}
                >
                  View trip
                </Link>
              </article>
            ) : null;
          })}
        </section>
      )}
    </>
  );
}
function SignInPrompt() {
  return (
    <div className="empty-state">
      <Icon name="bag" size={38} />
      <h2>All your adventures, in one place.</h2>
      <p>
        {authConfigured
          ? "Sign in to see your bookings and pick up where you left off."
          : "The agency is setting up account access. In the meantime, explore our destinations and save your favorites."}
      </p>
      <Link
        className="button button-green"
        href={authConfigured ? "/sign-in?redirect_url=%2Ftrips" : "/offers"}
      >
        {authConfigured ? "Log in to my trips" : "Explore trips"}
        <Icon name="arrow" size={17} />
      </Link>
    </div>
  );
}
export default function MyTrips() {
  return (
    <main className="shell" style={{ paddingBottom: 70 }}>
      <div className="page-top">
        <p className="eyebrow">A WORLD OF MEMORIES</p>
        <h1>Your trips. Your stories.</h1>
        <p>
          Your booking details, all together in one little corner of the world.
        </p>
      </div>
      {authConfigured ? <AccountTrips /> : <SignInPrompt />}
    </main>
  );
}
