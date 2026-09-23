"use client";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  TravelOffer,
  bookingPrice,
  formatDate,
  money,
  isBookable,
} from "@/app/lib/catalog";
import { authConfigured } from "@/app/lib/config";
import Icon from "./Icon";
import TravelImage from "./TravelImage";
interface Props {
  offer: TravelOffer;
  initialPackages: number;
  checkoutReady: boolean;
  testMode: boolean;
}
interface Traveler {
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  signedIn: boolean;
  loaded: boolean;
}
export default function BookingForm(props: Props) {
  return authConfigured ? (
    <AuthenticatedBooking {...props} />
  ) : (
    <Booking {...props} traveler={{ signedIn: false, loaded: true }} />
  );
}
function AuthenticatedBooking(props: Props) {
  const { user, isLoaded } = useUser();
  return (
    <Booking
      {...props}
      traveler={{
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.primaryEmailAddress?.emailAddress,
        signedIn: !!user,
        loaded: !!isLoaded,
      }}
    />
  );
}
function Booking({
  offer,
  initialPackages,
  checkoutReady,
  testMode,
  traveler,
}: Props & { traveler: Traveler }) {
  const [packages, setPackages] = useState(initialPackages);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const price = bookingPrice(offer, packages);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/createlink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: offer.id,
          packages,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          phone: data.get("phone"),
          notes: data.get("notes"),
          acceptedTerms: data.get("terms") === "on",
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Checkout could not be started. Please try again.",
        );
      if (!result.url) throw new Error("Checkout is temporarily unavailable.");
      window.location.assign(result.url);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setBusy(false);
    }
  }
  return (
    <main className="shell">
      <div className="page-top">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href={`/offer/${offer.id}`}>Your escape</Link>
          <Icon name="chevron" size={11} />
          <span>Traveler details</span>
          <Icon name="chevron" size={11} />
          <span>Secure payment</span>
        </nav>
        <p className="eyebrow">THE START OF SOMETHING GOOD</p>
        <h1>You’re going to {offer.hotelCity}.</h1>
        <p>
          A few details, then you’re one step closer to somewhere wonderful.
        </p>
      </div>
      <div className="checkout-layout">
        <div>
          {!checkoutReady && (
            <p className="notice" role="status">
              Online booking is being set up. Explore this trip and contact the
              agency with questions; payments are currently unavailable.
            </p>
          )}
          {testMode && (
            <p className="notice">
              Preview collection · This checkout uses Stripe test mode. These
              sample packages are for demonstration and do not reserve
              accommodation.
            </p>
          )}
          {!traveler.signedIn && (
            <div className="notice">
              {authConfigured ? (
                <>
                  <Link
                    className="text-link"
                    href={`/sign-in?redirect_url=${encodeURIComponent(`/booking/confirmation/${offer.id}?packages=${packages}`)}`}
                  >
                    Log in to securely complete your booking{" "}
                    <Icon name="arrow" size={15} />
                  </Link>
                  <p>Your booking will be saved to your account.</p>
                </>
              ) : (
                "Account sign-in is not available yet. The agency needs to connect Clerk before accepting bookings."
              )}
            </div>
          )}
          <form className="checkout-form" onSubmit={submit}>
            <h2>Who’s coming along?</h2>
            <p>
              Enter the lead traveler’s details as they appear on your travel
              documents.
            </p>
            <div className="form-row">
              <label className="field">
                First name
                <input
                  name="firstName"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                  defaultValue={traveler.firstName || ""}
                  key={`first-${traveler.firstName}`}
                  placeholder="First name"
                />
              </label>
              <label className="field">
                Last name
                <input
                  name="lastName"
                  autoComplete="family-name"
                  required
                  maxLength={80}
                  defaultValue={traveler.lastName || ""}
                  key={`last-${traveler.lastName}`}
                  placeholder="Last name"
                />
              </label>
            </div>
            <label className="field">
              Email address
              <input
                type="email"
                value={traveler.email || ""}
                readOnly
                placeholder="Your signed-in email address"
              />
            </label>
            <label className="field">
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                minLength={6}
                maxLength={30}
                placeholder="Include your country code"
              />
            </label>
            <label className="field">
              Your group
              <select
                value={packages}
                onChange={(e) => setPackages(Number(e.target.value))}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n * offer.person} travelers · {n}{" "}
                    {n === 1 ? "package" : "packages"}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Anything we should know?{" "}
              <span style={{ fontWeight: 400 }}>
                Optional — requests are subject to availability.
              </span>
              <textarea
                name="notes"
                maxLength={400}
                placeholder="Arrival details or a room preference…"
              />
            </label>
            <label className="checkbox-field">
              <input required name="terms" type="checkbox" />
              <span>
                I have reviewed the trip’s cancellation policy and agree to the{" "}
                <Link href="/terms" target="_blank">
                  booking terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank">
                  privacy policy
                </Link>
                .
              </span>
            </label>
            {error && (
              <p className="notice error-notice" role="alert">
                {error}
              </p>
            )}
            <button
              className="button button-green"
              type="submit"
              disabled={
                busy ||
                !checkoutReady ||
                !traveler.signedIn ||
                !traveler.loaded ||
                !isBookable(offer)
              }
            >
              {busy
                ? "Preparing your secure checkout…"
                : "Continue to secure payment"}
              <Icon name="arrow" size={18} />
            </button>
            <p
              className="booking-note"
              style={{ justifyContent: "flex-start" }}
            >
              <Icon name="shield" size={14} />
              Your payment details are handled securely by Stripe.
            </p>
          </form>
        </div>
        <aside className="booking-card checkout-summary">
          <TravelImage
            src={offer.image}
            alt={offer.hotelCity}
            className="checkout-photo"
          />
          <p className="eyebrow">YOUR NEXT ESCAPE</p>
          <h3>{offer.hotelName}</h3>
          <p>
            {offer.hotelCity}, {offer.country} · {offer.hotelStars}-star stay
          </p>
          <div className="price-row">
            <span>Departure</span>
            <strong>{formatDate(offer.startDate)}</strong>
          </div>
          <div className="price-row">
            <span>Stay</span>
            <span>{offer.duration}</span>
          </div>
          <div className="price-row">
            <span>Travelers</span>
            <span>{price.travelers}</span>
          </div>
          <div className="price-row">
            <span>
              {packages} × {money(offer.totalCost)} package
            </span>
            <span>{money(price.subtotal / 100)}</span>
          </div>
          <div className="price-row">
            <span>Taxes & fees (10%)</span>
            <span>{money(price.fees / 100)}</span>
          </div>
          <div className="price-row total">
            <span>Total in EUR</span>
            <strong>{money(price.total / 100)}</strong>
          </div>
          <p style={{ fontSize: 13, marginTop: 20 }}>
            {offer.cancellationPolicy}
          </p>
          <Link className="text-link" href={`/offer/${offer.id}`}>
            Review trip details <Icon name="arrow" size={14} />
          </Link>
        </aside>
      </div>
    </main>
  );
}
