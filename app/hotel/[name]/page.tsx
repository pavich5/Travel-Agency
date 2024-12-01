"use client";
import { useEffect, useState } from "react";
import { Offer } from "@/app/types";
import { vacationsCategories } from "@/app/mocks/data";
import styles from "./page.module.css";
import HotelDetails from "@/app/Components/HotelDetails/HotelDetails";
import { findCountryName } from "@/app/utils/helper";
import { Spinner } from "@chakra-ui/react";
const Page = ({ params }: any) => {
  const [foundHotel, setFoundHotel] = useState<Offer | undefined>();
  const decodedName = decodeURIComponent(params.name);

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
        <HotelDetails
          foundHotel={foundHotel}
          findCountryName={() =>
            findCountryName(decodedName, vacationsCategories)
          }
        />
      ) : (
        <div className={styles.skeletonWrapper}>
          <Spinner className={styles.spinner} />
        </div>
      )}
    </div>
  );
};

export default Page;
