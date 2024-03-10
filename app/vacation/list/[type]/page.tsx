"use client"
import React, { useState, useRef } from 'react';
import styles from './page.module.css';
import { Button, Input } from 'antd';
import { vacationsCategories } from '@/app/Data/data';
import { useRouter } from 'next/navigation';
import { SearchOutlined } from '@ant-design/icons';

const Page = ({ params }: any) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
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
          <div className={styles.allOfferList}>
            {vacationType && filteredVacations.map((vacation, index) => (
              vacation.offers.map((offer, offerIndex) => (
                // @ts-ignore
                <div onClick={() => router.push(`/offer/${offer.id}`, { shallow: true })} className={styles.oneOfferCard} key={offerIndex} style={{ backgroundImage: `url(${offer.offerImage})` }}>
                  <div>
                    <p className={styles.offerName}>{offer.hotelName}</p>
                    <p style={{ fontSize: '15px', marginTop: '10px', fontWeight: 600 }}>Price: ${offer.totalCost}</p>
                    <p style={{ fontSize: '15px', marginTop: '2px', fontWeight: 600 }}>City: {offer.hotelCity}</p>
                    <button className={styles.viewOfferButton}>View Offer</button>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Page;