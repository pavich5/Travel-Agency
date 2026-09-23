"use client";
import Link from "next/link";
import { money, formatDate, TravelOffer } from "@/app/lib/catalog";
import { useSavedTrips } from "./TravelProvider";
import Icon from "./Icon";
import TravelImage from "./TravelImage";
export function SaveButton({
  id,
  label = false,
}: {
  id: number;
  label?: boolean;
}) {
  const { saved, toggle } = useSavedTrips();
  const selected = saved.includes(id);
  return (
    <button
      type="button"
      className={`save-button ${selected ? "is-saved" : ""} ${label ? "with-label" : ""}`}
      aria-label={`${selected ? "Unsave" : "Save"} trip`}
      aria-pressed={selected}
      onClick={() => toggle(id)}
    >
      <Icon name="heart" size={19} />
      {label && (selected ? "Saved" : "Save trip")}
    </button>
  );
}
export default function OfferCard({ offer }: { offer: TravelOffer }) {
  return (
    <article className="offer-card">
      <div className="offer-photo">
        <Link href={`/offer/${offer.id}`} tabIndex={-1} aria-hidden="true">
          <TravelImage
            src={offer.image}
            alt={`${offer.hotelCity}, ${offer.country}`}
          />
        </Link>
        <span className="offer-tag">{offer.season} collection</span>
        <SaveButton id={offer.id} />
      </div>
      <div className="offer-card-body">
        <div className="offer-location">
          <span>
            <Icon name="pin" size={14} />
            {offer.hotelCity}, {offer.country}
          </span>
          <span className="hotel-stars">
            <Icon name="star" size={13} />
            {offer.hotelStars}-star stay
          </span>
        </div>
        <Link href={`/offer/${offer.id}`} className="offer-title">
          <h3>{offer.hotelName}</h3>
        </Link>
        <p className="offer-inclusions">
          {offer.duration} <span>·</span> {offer.mealPlan}
        </p>
        <p className="offer-departure">
          <Icon name="calendar" size={14} />
          {formatDate(offer.startDate)}
        </p>
        <div className="offer-card-bottom">
          <div>
            <span className="price">{money(offer.totalCost)}</span>
            <span className="price-label">
              {" "}
              / {offer.person === 1 ? "person" : `${offer.person} people`}
            </span>
            <small>+ 10% taxes & fees</small>
          </div>
          <Link
            href={`/offer/${offer.id}`}
            className="round-link"
            aria-label={`View ${offer.hotelName}`}
          >
            <Icon name="arrow" size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}
