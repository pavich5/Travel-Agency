"use client";

import { useMemo, useRef, useState } from "react";
import { Button, Input, Select } from "antd";
import { CalendarOutlined, EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { vacationsCategories } from "@/app/mocks/data";
import styles from "./page.module.css";

const { Option } = Select;

const priceBands = [
  { label: "Any budget", value: "all" },
  { label: "Under 900 EUR", value: "900" },
  { label: "Under 1400 EUR", value: "1400" },
  { label: "Luxury 1400+ EUR", value: "1401" },
];

const Page = ({ params }: { params: { type: string } }) => {
  const offersRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  const vacationType = vacationsCategories.categories.find((category) =>
    category.name.toLowerCase().includes(params.type.toLowerCase())
  );

  const allOffers = useMemo(
    () =>
      vacationType?.countrys.flatMap((vacation) =>
        vacation.offers.map((offer) => ({
          ...offer,
          countryName: vacation.countryName,
          countryDescription: vacation.description,
          countryImage: vacation.image,
        }))
      ) ?? [],
    [vacationType]
  );

  const cityOptions = Array.from(new Set(allOffers.map((offer) => offer.hotelCity)));

  const filteredOffers = allOffers.filter((offer) => {
    const matchesSearch =
      !searchQuery ||
      offer.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.hotelCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.countryName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = cityFilter === "all" || offer.hotelCity === cityFilter;

    const matchesPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "1401"
          ? offer.totalCost >= 1400
          : offer.totalCost <= Number(priceFilter);

    return matchesSearch && matchesCity && matchesPrice;
  });

  const featuredCountries = vacationType?.countrys ?? [];

  return (
    <div className={styles.pageWrapper}>
      <section
        className={styles.hero}
        style={{ backgroundImage: `linear-gradient(120deg, rgba(7, 20, 18, 0.68), rgba(7, 20, 18, 0.28)), url(${vacationType?.image})` }}
      >
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{params.type} Collection</p>
          <h1>{vacationType?.name ?? `${params.type} Vacations`}</h1>
          <p className={styles.heroText}>
            Curated seasonal trips with clearer pricing, stronger hotel picks, and a calmer booking flow.
          </p>
          <div className={styles.heroStats}>
            <div>
              <strong>{featuredCountries.length}</strong>
              <span>destinations</span>
            </div>
            <div>
              <strong>{allOffers.length}</strong>
              <span>packages</span>
            </div>
            <div>
              <strong>{cityOptions.length}</strong>
              <span>cities</span>
            </div>
          </div>
          <div className={styles.heroActions}>
            <Button type="primary" onClick={() => offersRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Browse Offers
            </Button>
            <Button onClick={() => destinationsRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Explore Destinations
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.destinationsSection} ref={destinationsRef}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Destinations</p>
          <h2>Seasonal destinations with personality.</h2>
        </div>
        <div className={styles.destinationGrid}>
          {featuredCountries.map((vacation) => (
            <Link
              key={vacation.countryName}
              className={styles.destinationCard}
              style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 19, 18, 0.08), rgba(8, 19, 18, 0.78)), url(${vacation.image})` }}
              href={`/vacation/${vacation.countryName}`}
            >
              <div className={styles.destinationCardContent}>
                <p className={styles.destinationTitle}>{vacation.countryName}</p>
                <p>{vacation.description}</p>
                <span>View trips</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.offersSection} ref={offersRef}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Offers</p>
          <h2>Find the package that matches your pace.</h2>
        </div>

        <div className={styles.filterBar}>
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by hotel, city, or country"
            prefix={<SearchOutlined />}
            className={styles.searchInput}
          />
          <Select value={cityFilter} onChange={setCityFilter} className={styles.filterSelect}>
            <Option value="all">All cities</Option>
            {cityOptions.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
          <Select value={priceFilter} onChange={setPriceFilter} className={styles.filterSelect}>
            {priceBands.map((band) => (
              <Option key={band.value} value={band.value}>
                {band.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className={styles.resultsMeta}>
          <p>{filteredOffers.length} curated offers</p>
          <p>All dates shown are upcoming.</p>
        </div>

        <div className={styles.offerGrid}>
          {filteredOffers.map((offer) => (
            <article key={offer.id} className={styles.offerCard}>
              <div
                className={styles.offerImage}
                style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 19, 18, 0.04), rgba(8, 19, 18, 0.45)), url(${offer.offerImage})` }}
              />
              <div className={styles.offerCardBody}>
                <div className={styles.offerTopRow}>
                  <span className={styles.offerBadge}>{offer.countryName}</span>
                  <span className={styles.offerPrice}>€{offer.totalCost}</span>
                </div>
                <h3>{offer.hotelName}</h3>
                <p className={styles.offerLocation}>
                  <EnvironmentOutlined /> {offer.hotelCity}
                </p>
                <p className={styles.offerMeta}>
                  <CalendarOutlined /> {offer.startDate} • {offer.duration} • {offer.hotelStars} stars
                </p>
                <p className={styles.offerDescription}>{offer.hotelDescription.slice(0, 120)}...</p>
                <div className={styles.offerActions}>
                  <Link href={`/offer/${offer.id}`}>
                    <Button type="primary">View Offer</Button>
                  </Link>
                  <Link href={`/vacation/${offer.countryName}`}>
                    <Button>Country Page</Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
