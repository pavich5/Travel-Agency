"use client"
import React, { useEffect, useState } from 'react';
import { Rate } from 'antd';
import { Offer, Review } from '@/app/types';
import { vacationsCategories, startsList } from '@/app/Data/data';
import styles from './page.module.css';
import Reviews from '@/app/Components/ReviewsComponent/Reviews';

const Page = ({ params }: any) => {
    const [foundHotel, setFoundHotel] = useState<Offer | undefined>();
    const decodedName = decodeURIComponent(params.name);

    const findCountryName = (): string => {
        console.log("Finding country name for:", decodedName);
        let foundCountry: string | undefined;
        vacationsCategories.categories.some((category) => {
            return category.countrys.some((country) => {
                const foundOffer = country.offers.find((offer) => {
                    console.log("Checking offer:", offer.hotelName);
                    return offer.hotelName === decodedName;
                });
                if (foundOffer) {
                    foundCountry = country.countryName;
                    return true;
                }
                return false;
            });
        });
        console.log("Found country:", foundCountry);
        return foundCountry ? foundCountry : 'Country not found';
    };

    useEffect(() => {
        const foundHotel = vacationsCategories.categories
            .flatMap((category) => category.countrys)
            .flatMap((country) => country.offers)
            .find((offer) => offer.hotelName === decodedName);
        // @ts-ignore
        setFoundHotel(foundHotel);
    }, [params, decodedName]);

    return (
        <div className={styles.mainPageWrapper}>
            {foundHotel ? (
                <FoundHotel foundHotel={foundHotel} findCountryName={findCountryName} />
            ) : (
                <img src="https://dpauls.com/_nuxt/img/hotel-not-found.e006c8a.png" alt="" />
            )}
        </div>
    );
};

const FoundHotel = ({ foundHotel, findCountryName }: { foundHotel: Offer, findCountryName: () => string }) => (
    <div className={styles.foundHotelWrapper}>
        <img
            style={{
                minWidth: '63vw',
                height: '300px',
                borderRadius: '24px',
                objectFit: 'cover'
            }}
            src={foundHotel.hotelCoverImage}
            alt="hotel image"
        />
        <div className={styles.bottomLayer}>
            <h3 className={styles.hotelName}>{foundHotel.hotelName} {foundHotel.hotelCity}</h3>
            <small className={styles.hotelPlace}>{findCountryName()}, {foundHotel.hotelCity} - {foundHotel.hotelStars} stars</small>
            <div className={styles.startsList}>
                <div className={styles.hotelStar}>
                    <p>{foundHotel.hotelStars}</p>
                    <p>Excellent</p>
                </div>
                {startsList.map((starObj) => (
                    <div key="star-ratings" className={styles.defaultStars}>
                        {Object.entries(starObj).map(([stars, description]) => (
                            <div className={styles.defaultStar} key={stars}>
                                <p>{stars} </p>
                                <p>{description}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <h3>Amenities</h3>
            <div className={styles.amentediesList}>
                {foundHotel?.amenities?.map((amentedie: string) => (
                    <div className={styles.amentedie} key={amentedie}>
                        {amentedie}
                    </div>
                ))}
            </div>
            <div className={styles.hotelDescription}>
                <h3>Description</h3>
                <p>{foundHotel.hotelDescription}</p>
            </div>
            <Reviews offerDetails={foundHotel} />
        </div>
    </div>
);



export default Page;
