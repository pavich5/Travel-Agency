"use client";
import { useState } from "react";
import Link from "next/link";
import { Image } from "antd";
import {
  TravelOffer,
  bookingPrice,
  formatDate,
  money,
  isBookable,
} from "@/app/lib/catalog";
import Icon from "./Icon";
import TravelImage from "./TravelImage";
import { SaveButton } from "./OfferCard";
export default function OfferDetail({
  offer,
  hotelView = false,
}: {
  offer: TravelOffer;
  hotelView?: boolean;
}) {
  const [packages, setPackages] = useState(1);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const price = bookingPrice(offer, packages);
  const available = isBookable(offer);
  return (
    <main className="shell">
      <div className="detail-head">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/offers">Explore trips</Link>
          <Icon name="chevron" size={11} />
          <Link href={`/vacation/${offer.country}`}>{offer.country}</Link>
          <Icon name="chevron" size={11} />
          <span>{offer.hotelCity}</span>
        </nav>
        <div className="page-top-row">
          <div>
            <p className="eyebrow">
              {offer.season.toUpperCase()} COLLECTION ·{" "}
              {offer.duration.toUpperCase()}
            </p>
            <h1>
              {hotelView
                ? offer.hotelName
                : `A little escape to ${offer.hotelCity}.`}
            </h1>
          </div>
          <SaveButton id={offer.id} label />
        </div>
        <div className="detail-subtitle">
          <span>
            <Icon name="pin" size={15} />
            {offer.hotelCity}, {offer.country}
          </span>
          <span className="hotel-stars">
            <Icon name="star" size={14} />
            {offer.hotelStars}-star hotel
          </span>
          <span>{offer.hotelName}</span>
        </div>
      </div>
      <div className="detail-gallery">
        <TravelImage
          src={offer.image}
          alt={`${offer.hotelCity}, ${offer.country}`}
          eager
        />
        <div className="detail-gallery-side">
          <TravelImage src={offer.hotelCoverImage} alt={offer.hotelName} />
          <TravelImage src={offer.roomImage} alt={offer.roomType} />
        </div>
      </div>
      <div className="detail-layout">
        <div>
          <nav className="detail-nav" aria-label="Offer sections">
            <a href="#overview">The experience</a>
            <a href="#included">What’s included</a>
            <a href="#reviews">Guest notes</a>
          </nav>
          <div className="detail-facts">
            <div>
              <Icon name="calendar" />
              <div>
                {formatDate(offer.startDate)}
                <span>Departure</span>
              </div>
            </div>
            <div>
              <Icon name="clock" />
              <div>
                {offer.duration}
                <span>Time to unwind</span>
              </div>
            </div>
            <div>
              <Icon name="users" />
              <div>
                {offer.person} {offer.person === 1 ? "traveler" : "travelers"}
                <span>Per package</span>
              </div>
            </div>
          </div>
          <section className="detail-section" id="overview">
            <p className="eyebrow">SETTLE IN. SWITCH OFF.</p>
            <h2>Your next chapter, in {offer.hotelCity}.</h2>
            <p>{offer.hotelDescription}</p>
            <p style={{ marginTop: 16 }}>{offer.location}</p>
            {!hotelView && (
              <Link
                className="text-link"
                style={{ marginTop: 19 }}
                href={`/hotel/${encodeURIComponent(offer.hotelName)}`}
              >
                Explore the hotel <Icon name="arrow" size={15} />
              </Link>
            )}
          </section>
          <section className="detail-section" id="included">
            <h2>The little details, taken care of.</h2>
            <div className="included-grid">
              {[
                offer.roomType,
                offer.mealPlan,
                offer.transportation,
                ...offer.amenities,
              ].map((item, i) => (
                <span key={`${item}-${i}`}>
                  <Icon name="check" size={16} />
                  {item}
                </span>
              ))}
            </div>
            <p style={{ marginTop: 20 }}>
              Pickup: {offer.pickUpLocation}. Return:{" "}
              {formatDate(offer.endDate)}. Flights are included only when
              explicitly listed in the transportation details.
            </p>
          </section>
          <section className="detail-section">
            <h2>Go beyond the postcard.</h2>
            {offer.activities.map((activity, i) => (
              <div className="activity" key={activity.name}>
                <span className="activity-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{activity.name}</h3>
                  <p>{activity.description}</p>
                </div>
              </div>
            ))}
          </section>
          <section className="detail-section">
            <h2>A little flexibility.</h2>
            <p>{offer.cancellationPolicy}</p>
            <Link
              href="/contact"
              className="text-link"
              style={{ marginTop: 16 }}
            >
              Questions before you go? <Icon name="arrow" size={15} />
            </Link>
          </section>
          <section className="detail-section">
            <h2>A closer look at your stay.</h2>
            <p>Open a photo to explore the gallery.</p>
            <button
              type="button"
              className="text-link"
              style={{
                background: "none",
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                marginTop: 12,
              }}
              onClick={() => setGalleryOpen(true)}
            >
              View photo gallery <Icon name="arrowUp" size={15} />
            </button>
            <Image.PreviewGroup
              preview={{
                visible: galleryOpen,
                onVisibleChange: setGalleryOpen,
              }}
            >
              <div className="stay-gallery">
                {[
                  offer.hotelCoverImage,
                  offer.roomImage,
                  ...offer.additionalImages,
                ].map((src, index) => (
                  <Image
                    key={`${src}-${index}`}
                    src={src}
                    alt={`${offer.hotelName}, photo ${index + 1}`}
                    loading="lazy"
                    fallback="/travel-placeholder.svg"
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          </section>
          <section className="detail-section" id="reviews">
            <h2>Notes from the journey.</h2>
            <p>Sample guest notes from this collection.</p>
            {offer.reviews.map((review, i) => (
              <div className="review" key={i}>
                <div>
                  <strong>{review.username}</strong>
                  <span
                    className="review-stars"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {"★".repeat(Math.min(5, Math.max(0, review.rating)))}
                  </span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </section>
        </div>
        <aside className="booking-card" aria-label="Booking summary">
          <p className="eyebrow">MAKE ROOM FOR SOMETHING GOOD</p>
          <span className="price">{money(offer.totalCost)}</span>
          <span className="price-label"> / package</span>
          <p className="price-context">
            {offer.duration} · {offer.person}{" "}
            {offer.person === 1 ? "traveler" : "travelers"} per package
          </p>
          <label className="field">
            Your group
            <select
              value={packages}
              onChange={(e) => setPackages(Number(e.target.value))}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n * offer.person}{" "}
                  {n * offer.person === 1 ? "traveler" : "travelers"} · {n}{" "}
                  {n === 1 ? "package" : "packages"}
                </option>
              ))}
            </select>
          </label>
          <div className="price-row">
            <span>{packages} × package</span>
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
          {available ? (
            <Link
              className="button button-green"
              href={`/booking/confirmation/${offer.id}?packages=${packages}`}
            >
              Let’s make it happen <Icon name="arrow" size={18} />
            </Link>
          ) : (
            <>
              <p className="notice">
                This departure has passed. Explore another trip.
              </p>
              <Link className="button button-green" href="/offers">
                Find another escape
              </Link>
            </>
          )}
          <p className="booking-note">
            <Icon name="shield" size={13} />
            Secure payment through Stripe
          </p>
          <p className="booking-note">Review every detail before you pay.</p>
        </aside>
      </div>
    </main>
  );
}
