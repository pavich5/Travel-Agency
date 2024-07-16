"use client";
import React, { useState, useRef } from "react";
import { Button, Input, Select } from "antd";
import { useRouter } from "next/navigation";
import { SearchOutlined } from "@ant-design/icons";
import { vacationsCategories } from "@/app/Data/data";
import styles from "./page.module.css";
import AllOffersList from "@/app/Components/AllOffersList/AllOffersList";
const { Option } = Select;
const Page = ({ params }: any) => {
  const router = useRouter();
  const allOffersRef = useRef<HTMLDivElement>(null);
  const topPicksRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<number | undefined>(undefined);
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);

  const vacationType = vacationsCategories.categories.find((category) =>
    category.name.toLowerCase().includes(params.type.toLowerCase())
  );

  const filteredVacations = vacationType
  ? vacationType.countrys.filter((vacation) =>
      vacation.offers.some((offer) =>
        offer.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.hotelCity.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  : [];

  const handleViewAllClick = () =>
    allOffersRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleExploreClick = () =>
    topPicksRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);
  const handlePriceFilterChange = (value?: number) => setPriceFilter(value);
  const handleCityFilterChange = (value?: string) => setCityFilter(value);

  return (
    <div className={styles.pageWrapper}>
      <div>
        <div
          className={styles.mainSection}
          style={{ backgroundImage: `url(${vacationType?.image})` }}
        >
          <div className={styles.sectionWrapper}>
            <h1 className={styles.sectionHeading}>{params.type} Vacations</h1>
            <p>Experience the season's best destinations with Globetrotter</p>
            <div className={styles.buttonsWrapper}>
              <Button type="primary" onClick={handleViewAllClick}>
                View All
              </Button>
              <Button onClick={handleExploreClick}>Explore</Button>
            </div>
          </div>
        </div>
        <div className={styles.availableVacationsWrapper} ref={topPicksRef}>
          <h3>{params.type} vacation countries</h3>
          <div className={styles.availableList}>
            {vacationType &&
              vacationType.countrys.map((vacation, index) => (
                <div
                  onClick={() =>
                    router.push(`/vacation/${vacation.countryName}`, {
                                      // @ts-ignore
                      shallow: true,
                    })
                  }
                  key={index}
                  className={styles.oneVacationCard}
                  style={{ backgroundImage: `url(${vacation.image})` }}
                >
                  <p className={styles.vacationName}>{vacation.countryName}</p>
                  <p>{vacation.description}</p>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.allOffers} ref={allOffersRef}>
          <h3>All {params.type} offers</h3>
          <Input
            placeholder="Search destination, trips, or experiences"
            prefix={<SearchOutlined className="site-form-item-icon" />}
            value={searchQuery}
            onChange={handleSearch}
          />
          <Select
            placeholder="Filter by Price"
            style={{ width: 200, marginBottom: 1 }}
            onChange={handlePriceFilterChange}
            value={priceFilter}
          >
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
              (price) => (
                <Option key={price} value={price}>{`${price}$`}</Option>
              )
            )}
            <Option value={1000}>$1000+</Option>
          </Select>
          <Select
            placeholder="Filter by City"
            style={{ width: 200, marginBottom: 16 }}
            onChange={handleCityFilterChange}
            value={cityFilter}
          >
            {filteredVacations
              .flatMap((vacation) =>
                vacation.offers.map((offer) => offer.hotelCity)
              )
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((city, index) => (
                <Option key={index} value={city}>
                  {city}
                </Option>
              ))}
          </Select>
          <AllOffersList
            filteredVacations={filteredVacations}
            vacationType={vacationType}
            cityFilter={cityFilter}
            priceFilter={priceFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
