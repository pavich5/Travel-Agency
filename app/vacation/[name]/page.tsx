"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, Select } from "antd";
import { CalendarOutlined, EnvironmentOutlined, FilterOutlined, StarFilled } from "@ant-design/icons";
import Link from "next/link";
import { vacationsCategories } from "@/app/mocks/data";
import { Offer } from "@/app/types";
import styles from "./page.module.css";

const { Option } = Select;

const Page = ({ params }: { params: { name: string } }) => {
  const [countryVacations, setCountryVacations] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedStars, setSelectedStars] = useState("all");
  const [selectedMealPlan, setSelectedMealPlan] = useState("all");

  useEffect(() => {
    const foundCountry = vacationsCategories.categories
      .flatMap((vacationType) => vacationType.countrys)
      .find((oneVacation) => oneVacation.countryName === params.name);

    setCountryVacations(foundCountry ?? null);
  }, [params.name]);

  const offers = countryVacations?.offers ?? [];
  const lowestPrice = offers.length
    ? Math.min(...offers.map((offer: Offer) => offer.totalCost))
    : 0;

  const cityOptions = useMemo(
    (): string[] => Array.from(new Set(offers.map((offer: Offer) => offer.hotelCity))),
    [offers]
  );
  const mealPlans = useMemo(
    (): string[] => Array.from(new Set(offers.map((offer: Offer) => offer.mealPlan))),
    [offers]
  );

  const filteredOffers = offers.filter((offer: Offer) => {
    const matchesSearch =
      !searchQuery ||
      offer.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.hotelCity.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === "all" || offer.hotelCity === selectedCity;
    const matchesStars = selectedStars === "all" || offer.hotelStars === Number(selectedStars);
    const matchesMealPlan = selectedMealPlan === "all" || offer.mealPlan === selectedMealPlan;

    return matchesSearch && matchesCity && matchesStars && matchesMealPlan;
  });

  return (
    <div className={styles.countryOffersWrapper}>
      {countryVacations && (
        <>
          <section
            className={styles.hero}
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(7, 20, 18, 0.72), rgba(7, 20, 18, 0.24)), url(${countryVacations.image})`,
            }}
          >
            <div className={styles.heroPanel}>
              <p className={styles.eyebrow}>Country Collection</p>
              <h1>{countryVacations.countryName} trips</h1>
              <p className={styles.heroText}>{countryVacations.description}</p>
              <div className={styles.heroMeta}>
                <div>
                  <strong>{offers.length}</strong>
                  <span>offers</span>
                </div>
                <div>
                  <strong>{cityOptions.length}</strong>
                  <span>cities</span>
                </div>
                <div>
                  <strong>{lowestPrice}€</strong>
                  <span>from</span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.contentGrid}>
            <aside className={styles.filtersCard}>
              <div className={styles.filtersHeading}>
                <FilterOutlined />
                <h2>Refine your trip</h2>
              </div>
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search hotel or city"
              />
              <Select value={selectedCity} onChange={setSelectedCity}>
                <Option value="all">All cities</Option>
                {cityOptions.map((city) => (
                  <Option key={city} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
              <Select value={selectedStars} onChange={setSelectedStars}>
                <Option value="all">Any star rating</Option>
                {[3, 4, 5].map((stars) => (
                  <Option key={stars} value={String(stars)}>
                    {stars} stars
                  </Option>
                ))}
              </Select>
              <Select value={selectedMealPlan} onChange={setSelectedMealPlan}>
                <Option value="all">Any meal plan</Option>
                {mealPlans.map((plan) => (
                  <Option key={plan} value={plan}>
                    {plan}
                  </Option>
                ))}
              </Select>
              <div className={styles.filterNote}>
                Upcoming dates only, with hotel, room, and meal-plan details shown up front.
              </div>
            </aside>

            <div className={styles.mainColumn}>
              <div className={styles.resultsHeader}>
                <div>
                  <p className={styles.eyebrow}>Available packages</p>
                  <h2>{filteredOffers.length} refined options</h2>
                </div>
                <p className={styles.resultsCopy}>
                  Better cards, clearer details, and less noise when you compare trips.
                </p>
              </div>

              <section className={styles.offerGrid}>
                {filteredOffers.map((offer: Offer) => (
                  <article key={offer.id} className={styles.offerCard}>
                    <div
                      className={styles.offerImage}
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(8, 19, 18, 0.05), rgba(8, 19, 18, 0.4)), url(${offer.offerImage})`,
                      }}
                    />
                    <div className={styles.offerBody}>
                      <div className={styles.offerTop}>
                        <span className={styles.price}>{offer.totalCost}€</span>
                        <span className={styles.stars}>
                          {offer.hotelStars} <StarFilled />
                        </span>
                      </div>
                      <h3>{offer.hotelName}</h3>
                      <p className={styles.location}>
                        <EnvironmentOutlined /> {offer.hotelCity}
                      </p>
                      <p className={styles.meta}>
                        <CalendarOutlined /> {offer.startDate} • {offer.endDate}
                      </p>
                      <div className={styles.tags}>
                        <span>{offer.duration}</span>
                        <span>{offer.roomType}</span>
                        <span>{offer.mealPlan}</span>
                      </div>
                      <div className={styles.actions}>
                        <Link href={`/offer/${offer.id}`}>
                          <Button type="primary">View Offer</Button>
                        </Link>
                        <Link href={`/hotel/${offer.hotelName}`}>
                          <Button>Hotel</Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Page;
