"use client";
import { useState } from "react";
import Link from "next/link";
import { destinations, offers, filterOffers, money } from "@/app/lib/catalog";
import OfferCard from "./OfferCard";
import Icon from "./Icon";
import { useSavedTrips } from "./TravelProvider";
export default function OfferExplorer({
  initialCountry = "",
  initialSeason = "",
  initialQuery = "",
  initialMonth = "",
  savedOnly = false,
}: {
  initialCountry?: string;
  initialSeason?: string;
  initialQuery?: string;
  initialMonth?: string;
  savedOnly?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [country, setCountry] = useState(initialCountry);
  const [season, setSeason] = useState(initialSeason);
  const [month, setMonth] = useState(initialMonth);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [maxPrice, setMaxPrice] = useState(3500);
  const [stars, setStars] = useState(0);
  const [meal, setMeal] = useState("");
  const [nights, setNights] = useState(0);
  const [room, setRoom] = useState("");
  const [transportation, setTransportation] = useState("");
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const { saved, ready } = useSavedTrips();
  const results = filterOffers({
    query,
    country,
    season,
    month,
    from,
    to,
    maxPrice,
    stars,
    meal,
    nights,
    room,
    transportation,
    sort,
    saved: savedOnly ? saved : undefined,
  });
  const pageCount = Math.ceil(results.length / 8);
  const currentPage = Math.min(page, Math.max(pageCount, 1));
  function reset() {
    setQuery("");
    setCountry("");
    setSeason("");
    setMonth("");
    setFrom("");
    setTo("");
    setMaxPrice(3500);
    setStars(0);
    setMeal("");
    setNights(0);
    setRoom("");
    setTransportation("");
    setPage(1);
  }
  const title = savedOnly
    ? "Your someday starts here."
    : country
      ? `${country}, your way.`
      : season
        ? `${season} looks good on you.`
        : "Find your kind of somewhere.";
  return (
    <main className="shell">
      <div className="page-top">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Icon name="chevron" size={11} />
          <span>{savedOnly ? "Saved trips" : "Explore trips"}</span>
        </nav>
        <p className="eyebrow">
          {savedOnly
            ? "KEEP THE GOOD ONES CLOSE"
            : "LESS ORDINARY. MORE OUT THERE."}
        </p>
        <h1>{title}</h1>
        <p>
          {savedOnly
            ? "All the places you’re dreaming about, saved on this device. Pick up where your curiosity left off."
            : "Discover thoughtfully chosen stays and experiences. Find the trip that feels like you."}
        </p>
        <div className="catalog-search">
          <Icon name="search" size={19} />
          <input
            type="search"
            aria-label="Search destinations, cities or hotels"
            placeholder="A destination, a city, a little inspiration…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      <div className="catalog-layout">
        <aside className="filter-panel" aria-label="Trip filters">
          <div className="filter-title">
            <h2>Make it your trip</h2>
            <button onClick={reset}>Reset</button>
          </div>
          <label className="field">
            Destination
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Everywhere</option>
              {destinations.map((d) => (
                <option key={d.name}>{d.name}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Collection
            <select
              value={season}
              onChange={(e) => {
                setSeason(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Every season</option>
              {["Summer", "Winter", "Easter", "Spring"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Departure month
            <select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                setPage(1);
              }}
            >
              <option value="">I’m flexible</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {new Date(2027, i).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Package budget
            <input
              type="range"
              min="400"
              max="3500"
              step="50"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setPage(1);
              }}
            />
            <span className="range-labels">
              <span>€400</span>
              <span>Up to {money(maxPrice)}</span>
            </span>
          </label>
          <label className="field">
            Hotel rating
            <select
              value={stars}
              onChange={(e) => {
                setStars(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="0">Any rating</option>
              <option value="3">3 stars & above</option>
              <option value="4">4 stars & above</option>
              <option value="5">5-star stays</option>
            </select>
          </label>
          <label className="field">
            Meal plan
            <select
              value={meal}
              onChange={(e) => {
                setMeal(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Any meal plan</option>
              {Array.from(new Set(offers.map((o) => o.mealPlan))).map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Stay length
            <select
              value={nights}
              onChange={(e) => {
                setNights(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="0">Any duration</option>
              <option value="7">Up to 7 nights</option>
              <option value="10">Up to 10 nights</option>
              <option value="14">Up to 14 nights</option>
            </select>
          </label>
          <details className="advanced-filters">
            <summary
              style={{ fontSize: 14, cursor: "pointer", marginBottom: 16 }}
            >
              More preferences
            </summary>
            <label className="field">
              Depart on or after
              <input
                type="date"
                value={from}
                max={to || undefined}
                onChange={(event) => {
                  setFrom(event.target.value);
                  setPage(1);
                }}
              />
            </label>
            <label className="field">
              Depart on or before
              <input
                type="date"
                value={to}
                min={from || undefined}
                onChange={(event) => {
                  setTo(event.target.value);
                  setPage(1);
                }}
              />
            </label>
            <label className="field">
              Room type
              <select
                value={room}
                onChange={(e) => {
                  setRoom(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Any room</option>
                {Array.from(new Set(offers.map((o) => o.roomType))).map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label className="field">
              Transportation
              <select
                value={transportation}
                onChange={(e) => {
                  setTransportation(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Any transport</option>
                {Array.from(new Set(offers.map((o) => o.transportation))).map(
                  (t) => (
                    <option key={t}>{t}</option>
                  ),
                )}
              </select>
            </label>
          </details>
        </aside>
        <section className="catalog-results" aria-label="Matching trips">
          <div className="results-toolbar">
            <span role="status">
              <strong>{results.length}</strong>{" "}
              {results.length === 1 ? "escape" : "escapes"} to look forward to
            </span>
            <label>
              Sort by{" "}
              <select
                aria-label="Sort trips"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="recommended">Our picks</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="date">Soonest departure</option>
              </select>
            </label>
          </div>
          {savedOnly && !ready ? (
            <p role="status">Finding your saved trips…</p>
          ) : results.length ? (
            <div className="offer-grid">
              {results
                .slice((currentPage - 1) * 8, currentPage * 8)
                .map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name={savedOnly ? "heart" : "search"} size={35} />
              <h2>
                {savedOnly && !saved.length
                  ? "Your wishlist awaits."
                  : "Let’s widen the horizon."}
              </h2>
              <p>
                {savedOnly && !saved.length
                  ? "Tap the heart on any trip to save it here for another day."
                  : "No trips match those preferences yet. Try another month or a broader budget."}
              </p>
              {savedOnly && !saved.length ? (
                <Link href="/offers" className="button button-green">
                  Explore trips <Icon name="arrow" size={17} />
                </Link>
              ) : (
                <button className="button button-green" onClick={reset}>
                  Clear filters
                </button>
              )}
            </div>
          )}
          {pageCount > 1 && (
            <nav className="pagination" aria-label="Results pages">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  aria-label={`Page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  onClick={() => {
                    setPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}
