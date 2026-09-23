"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destinations, offers, photos, money } from "./lib/catalog";
import { travelExperiences } from "./mocks/data";
import Icon from "./Components/travel/Icon";
import OfferCard from "./Components/travel/OfferCard";
import TravelImage from "./Components/travel/TravelImage";
const categories = [
  { name: "All escapes", icon: "globe", value: "" },
  { name: "Sun & sea", icon: "sun", value: "Summer" },
  { name: "Into the mountains", icon: "mountain", value: "Winter" },
  { name: "City discoveries", icon: "compass", value: "Easter" },
  { name: "A little adventure", icon: "bag", value: "Spring" },
];
export default function Home() {
  const router = useRouter();
  const [season, setSeason] = useState("");
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const featured = season
    ? offers.filter((offer) => offer.season === season).slice(0, 3)
    : [
        offers.find((o) => o.id === 222)!,
        offers.find((o) => o.id === 61)!,
        offers.find((o) => o.id === 313131)!,
      ];
  return (
    <main>
      <section className="home-hero">
        <TravelImage
          className="hero-image"
          src={photos.Italy}
          alt="Colorful coastal villages above the Mediterranean in Cinque Terre, Italy"
          eager
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">
            <span /> SMALL MOMENTS. BIG ADVENTURES.
          </p>
          <h1>
            The world is calling.
            <br />
            <em>Go find your somewhere.</em>
          </h1>
          <p>
            Extraordinary places. Thoughtfully planned journeys.
            <br />
            All you have to do is show up.
          </p>
          <Link href="/offers" className="hero-explore">
            A new story starts here <Icon name="arrow" size={19} />
          </Link>
        </div>
        <span className="hero-side-note">LESS SCROLLING. MORE LIVING.</span>
      </section>
      <div className="search-shell shell">
        <form
          className="trip-search"
          onSubmit={(e) => {
            e.preventDefault();
            const query = new URLSearchParams();
            if (destination) query.set("country", destination);
            if (month) query.set("month", month);
            router.push(`/offers?${query}`);
          }}
        >
          <div className="search-intro">
            <Icon name="compass" size={29} />
            <span>
              Your next chapter
              <br />
              <strong>starts right here.</strong>
            </span>
          </div>
          <label>
            <Icon name="pin" />
            <span>
              <strong>Where to?</strong>
              <select
                aria-label="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Anywhere sounds good</option>
                {destinations.map((d) => (
                  <option key={d.name}>{d.name}</option>
                ))}
              </select>
            </span>
          </label>
          <label>
            <Icon name="calendar" />
            <span>
              <strong>When?</strong>
              <select
                aria-label="Departure month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">I’m flexible</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, "0")}>
                    {new Date(2027, i).toLocaleString("en", { month: "long" })}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <button className="button button-green" type="submit">
            <Icon name="search" size={18} />
            Find my escape
          </button>
        </form>
      </div>
      <div className="reassurance shell">
        <span>
          <Icon name="check" size={17} />
          Thoughtfully chosen stays
        </span>
        <span>
          <Icon name="shield" size={17} />
          Secure checkout with Stripe
        </span>
        <span>
          <Icon name="compass" size={17} />A journey for every kind of you
        </span>
      </div>
      <section className="section shell" id="destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
            <h2>
              Some places just <em>stay with you.</em>
            </h2>
          </div>
          <Link href="/offers" className="text-link">
            Explore all destinations <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="destination-grid">
          {["Greece", "Italy", "Switzerland", "Thailand"].map((name, i) => {
            const destination = destinations.find((d) => d.name === name)!;
            return (
              <Link
                key={name}
                href={`/vacation/${name}`}
                className={`destination-card destination-${i}`}
              >
                <TravelImage src={destination.image} alt={name} />
                <span className="destination-count">
                  {destination.count} curated escapes
                </span>
                <div className="destination-content">
                  <p>
                    {
                      [
                        "A slower kind of summer",
                        "La dolce vita is calling",
                        "Take the scenic route",
                        "A world of wonder",
                      ][i]
                    }
                  </p>
                  <h3>
                    {name}
                    <span>
                      <Icon name="arrowUp" size={22} />
                    </span>
                  </h3>
                  <span>From {money(destination.price)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="featured-section">
        <div className="shell section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">GOOD THINGS ON THE HORIZON</p>
              <h2>
                Your out-of-office <em>starts here.</em>
              </h2>
            </div>
            <Link href="/offers" className="text-link">
              See all trips <Icon name="arrow" size={18} />
            </Link>
          </div>
          <div className="trip-tabs" role="group" aria-label="Trip collections">
            {categories.map((category) => (
              <button
                key={category.name}
                aria-pressed={season === category.value}
                className={season === category.value ? "selected" : ""}
                onClick={() => setSeason(category.value)}
              >
                <Icon name={category.icon} size={18} />
                {category.name}
              </button>
            ))}
          </div>
          <div className="offer-grid">
            {featured.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
          <p className="collection-note">
            A collection for every season. A place for every pace.
          </p>
        </div>
      </section>
      <section className="section shell why-section">
        <div className="why-photo">
          <TravelImage
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85"
            alt="Sunlight breaking over a dramatic mountain landscape"
          />
          <div className="photo-note">
            <Icon name="compass" size={26} />
            <span>
              Take the long way home.
              <br />
              <em>It’s usually the better story.</em>
            </span>
          </div>
        </div>
        <div className="why-copy">
          <p className="eyebrow">A LITTLE MORE PERSONAL</p>
          <h2>
            Great trips don’t
            <br />
            happen by chance.
            <br />
            <em>They happen by care.</em>
          </h2>
          <p>
            We believe the best journeys leave room for wonder. So we bring the
            stays, experiences, and little details together — leaving you free
            to enjoy the good part.
          </p>
          <div className="why-feature">
            <Icon name="compass" size={23} />
            <div>
              <h3>Less planning. More possibility.</h3>
              <p>Discover stays, activities, and transfers in one place.</p>
            </div>
          </div>
          <div className="why-feature">
            <Icon name="shield" size={23} />
            <div>
              <h3>The details, made clear.</h3>
              <p>Know what’s included and what you’ll pay before you book.</p>
            </div>
          </div>
          <Link className="text-link" href="/about">
            A little about us <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>
      <section className="planner-banner shell">
        <div>
          <p className="eyebrow light">A LITTLE INSPIRATION GOES A LONG WAY</p>
          <h2>
            Big travel dreams?
            <br />
            <em>Let’s give them a plan.</em>
          </h2>
          <p>
            Meet your always-curious travel companion. Get ideas,
            <br />
            ask questions, and find a journey that feels like you.
          </p>
          <Link className="button button-cream" href="/ai">
            <Icon name="sparkles" size={18} />
            Meet your trip planner <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="planner-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <Icon name="globe" size={170} />
          <span className="orbit-tag tag-one">A week in Italy?</span>
          <span className="orbit-tag tag-two">
            <Icon name="sun" size={17} />
            Somewhere sunny.
          </span>
          <span className="orbit-tag tag-three">
            A little off the beaten path ↗
          </span>
        </div>
      </section>
      <section className="section shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE TRAVEL JOURNAL</p>
            <h2>
              A few stories for <em>the road.</em>
            </h2>
          </div>
          <Link href="/blogs" className="text-link">
            Open the journal <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="journal-grid">
          {travelExperiences.slice(0, 3).map((story) => (
            <Link
              href={`/blogs/${story.id}`}
              key={story.id}
              className="journal-card"
            >
              <div className="journal-image">
                <TravelImage src={story.image} alt={story.destination} />
                <span>
                  <Icon name="arrowUp" size={20} />
                </span>
              </div>
              <p className="journal-meta">
                {story.category}
                <span>{story.readTime}</span>
              </p>
              <h3>{story.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="closing-note shell">
        <Icon name="globe" size={30} />
        <p>
          Less ordinary. <em>More out there.</em>
        </p>
        <Link href="/offers" className="text-link">
          Let’s go somewhere <Icon name="arrow" size={18} />
        </Link>
      </section>
    </main>
  );
}
