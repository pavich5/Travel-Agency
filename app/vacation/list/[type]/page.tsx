"use client"
import React, { useState, useRef } from 'react';
import styles from './page.module.css';
import { Button, Input, Select } from 'antd'; 
import { vacationsCategories } from '@/app/Data/data';
import { useRouter } from 'next/navigation';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select; 

const Page = ({ params }: any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<number | undefined>(undefined); 
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);

  const vacationType = vacationsCategories.categories.find(category =>
    category.name.toLowerCase().includes(params.type.toLowerCase())
  );

  const filteredVacations = vacationType ? vacationType.countrys.filter(vacation =>
    vacation.offers.some(offer =>
      offer.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) : [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceFilterChange = (value: number | undefined) => {
    setPriceFilter(value);
  };

  const handleCityFilterChange = (value: string | undefined) => {
    setCityFilter(value);
  };

  const allOffersRef = useRef<HTMLDivElement>(null);
  const topPicksRef = useRef<HTMLDivElement>(null);

  const handleViewAllClick = () => {
    allOffersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    topPicksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.pageWrapper}>
      <div>
        <div className={styles.mainSection} style={{ backgroundImage: `url(${vacationType?.image})` }}>
          <div className={styles.sectionWrapper}>
            <h1 className={styles.sectionHeading}>
              {params.type} Vacations
            </h1>
            <p>Experience the season's best destinations with Globetrotter</p>
            <div className={styles.buttonsWrapper}>
              <Button type='primary' onClick={handleViewAllClick}>
                View All
              </Button>
              <Button onClick={handleExploreClick}>
                Explore
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.availableVacationsWrapper} ref={topPicksRef}>
          <h3>{params.type} vacation countries</h3>
          <div className={styles.availableList}>
            {vacationType && vacationType.countrys.slice(0, 4).map((vacation, index) => (
              <div onClick={() => {
                // @ts-ignore
                router.push(`/vacation/${vacation.countryName}`, { shallow: true });
              }} key={index} className={styles.oneVacationCard} style={{ backgroundImage: `url(${vacation.image})` }}>
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
            style={{ width: 200, marginBottom: 16 }}
            onChange={handlePriceFilterChange}
            value={priceFilter}
          >
            <Option value={100}>100$</Option>
            <Option value={200}>200$</Option>
            <Option value={300}>300$</Option>
            <Option value={400}>400$</Option>
            <Option value={500}>500$</Option>
            <Option value={600}>600$</Option>
            <Option value={700}>700$</Option>
            <Option value={800}>800$</Option>
            <Option value={900}>900$</Option>
            <Option value={1000}>1000+</Option>
          </Select>
          <Select 
            placeholder="Filter by City"
            style={{ width: 200, marginBottom: 16 }}
            onChange={handleCityFilterChange}
            value={cityFilter}
          >
            {filteredVacations.flatMap(vacation => vacation.offers.map(offer => offer.hotelCity)).filter((value, index, self) => self.indexOf(value) === index).map((city, index) => (
              <Option key={index} value={city}>{city}</Option>
            ))}
          </Select>
          <div className={styles.allOfferList}>
            {vacationType && filteredVacations.map((vacation, index) => (
              vacation.offers.map((offer, offerIndex) => {
                if ((priceFilter === undefined || offer.totalCost <= priceFilter) &&
                    (cityFilter === undefined || offer.hotelCity === cityFilter)) {
                  return (
                    // @ts-ignore
                    <div onClick={() => router.push(`/offer/${offer.id}`, { shallow: true })} className={styles.oneOfferCard} key={offerIndex} style={{ backgroundImage: `url(${offer.offerImage})` }}>
                      <div>
                        <p className={styles.offerName}>{offer.hotelName}</p>
                        <p style={{ fontSize: '15px', marginTop: '10px', fontWeight: 600 }}>Price: ${offer.totalCost}</p>
                        <p style={{ fontSize: '15px', marginTop: '2px', fontWeight: 600 }}>City: {offer.hotelCity}</p>
                        <button className={styles.viewOfferButton}>View Offer</button>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Page;