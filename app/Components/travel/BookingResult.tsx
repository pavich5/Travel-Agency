"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { money } from "@/app/lib/catalog";
type Confirmation = {
  paid: boolean;
  id: string;
  offerId: number;
  hotelName: string;
  hotelCity: string;
  total: number;
  currency: string;
  travelers: number;
  testMode: boolean;
};
export default function BookingResult({
  sessionId,
  offerId,
}: {
  sessionId?: string;
  offerId: string;
}) {
  const [booking, setBooking] = useState<Confirmation>();
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    setBooking(undefined);
    if (!sessionId) {
      setError(
        "No checkout reference was provided. Open My trips to see your verified bookings.",
      );
      return;
    }
    const controller = new AbortController();
    setError("");
    fetch(`/api/booking-status?session_id=${encodeURIComponent(sessionId)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        if (String(result.offerId) !== offerId)
          throw new Error("This checkout reference does not match the trip.");
        setBooking(result);
      })
      .catch((error) => {
        if (error.name !== "AbortError")
          setError(error.message || "We couldn’t verify your payment.");
      });
    return () => controller.abort();
  }, [sessionId, offerId, attempt]);
  return (
    <main className="result-page">
      <div className="success-icon">
        <Icon name={booking?.paid ? "check" : "bag"} size={32} />
      </div>
      <p className="eyebrow">
        {booking?.paid ? "SOMETHING TO LOOK FORWARD TO" : "YOUR BOOKING"}
      </p>
      <h1>
        {booking?.paid
          ? `See you in ${booking.hotelCity}.`
          : error
            ? "Let’s check your booking."
            : booking
              ? "Your payment is processing."
              : "Checking your payment…"}
      </h1>
      {booking?.paid ? (
        <>
          <p>
            {booking.testMode
              ? "Your test payment was successful. This demonstration does not reserve accommodation."
              : "Your payment was verified and your booking is saved in My trips."}
          </p>
          <div className="result-details">
            <div className="price-row">
              <span>Your stay</span>
              <strong>{booking.hotelName}</strong>
            </div>
            <div className="price-row">
              <span>Travelers</span>
              <span>{booking.travelers}</span>
            </div>
            <div className="price-row">
              <span>Total paid</span>
              <strong>{money(booking.total / 100)}</strong>
            </div>
            <p
              style={{ fontSize: 12, overflowWrap: "anywhere", marginTop: 15 }}
            >
              Reference: {booking.id}
            </p>
          </div>
        </>
      ) : (
        <p role={error ? "alert" : "status"}>
          {error ||
            (booking
              ? "Stripe has not confirmed payment yet. Check again in a moment; please don’t submit a second payment."
              : "We’re securely checking your checkout reference with Stripe.")}
        </p>
      )}
      <div className="result-actions">
        {sessionId && !booking?.paid && (
          <button
            className="button button-outline"
            onClick={() => setAttempt((a) => a + 1)}
          >
            Check again
          </button>
        )}
        <Link className="button button-green" href="/trips">
          View my trips <Icon name="arrow" size={17} />
        </Link>
        <Link className="button button-outline" href="/offers">
          Keep exploring
        </Link>
      </div>
    </main>
  );
}
