"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { blogPosts, vacationsCategories } from "./Data/data";
import TravelGuideSection from "./Components/TravelGuideSection/TravelGuideSection";
import BlogSection from "./Components/BlogsSection/BlogSection";
import TravelDestinationList from "./Components/TravelDestionationList/TravelDestinationList";
import TravelSeasonSection from "./Components/TravelSeasonsSection/TravelSeasonSection";
import WhyTravelWithUs from "./Components/WhyTravelWithUs/WhyTravelWithUs";
import LandingSection from "./Components/LandingSecton/LandingSection";
import OurServices from "./Components/OurServicesSection/OurServices";

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(
    vacationsCategories.categories.flatMap((category) =>
      category.countrys.flatMap((country) =>
        country.offers.map((offer) => ({
          id: offer.id,
          hotelName: offer.hotelName,
          location: offer.location,
          image: offer.hotelCoverImage,
          duration: offer.duration,
          totalCost: offer.totalCost,
        }))
      )
    )
  );
  const itemsPerPage = 4;
  const currentItems = vacationsCategories.categories.flatMap(
    (category) => category.countrys
  );
  useEffect(() => {
    const filteredResults = vacationsCategories.categories.flatMap((category) =>
      category.countrys.flatMap((country) =>
        country.offers
          .filter((offer) =>
            offer.hotelName.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((offer) => ({
            id: offer.id,
            hotelName: offer.hotelName,
            location: offer.location,
            image: offer.hotelCoverImage,
            duration: offer.duration,
            totalCost: offer.totalCost,
          }))
      )
    );
    setFilteredData(filteredResults);
  }, [searchValue]);

  const handleNextPage = () => {
    const totalItems = vacationsCategories.categories.flatMap(
      (category) => category.countrys
    ).length;
    const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);
    if (indexOfLastItem >= totalItems) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  const renderPageNumbers = () => {
    const totalItems = vacationsCategories.categories.flatMap(
      (category) => category.countrys
    ).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    return pageNumbers.map((page) => (
      <span
        key={page}
        className={page === currentPage ? styles.currentPage : ""}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </span>
    ));
  };

  return (
    <div className={styles.homePageWrapper}>
      <div>
        <div className={styles.mainSection}>
          <LandingSection
            filteredData={filteredData}
            handleInputChange={handleInputChange}
            searchValue={searchValue}
          />
        </div>
        <TravelSeasonSection vacationsCategories={vacationsCategories} />
        <TravelDestinationList
          currentItems={currentItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )}
        />
        <div className={styles.pagination}>
          <LeftOutlined
            onClick={handlePreviousPage}
            className={currentPage === 1 ? styles.disabled : ""}
          />
          {renderPageNumbers()}
          <RightOutlined
            onClick={handleNextPage}
            className={
              currentPage * itemsPerPage >= filteredData.length
                ? styles.disabled
                : ""
            }
          />
        </div>
        <WhyTravelWithUs />
        <OurServices />
        <BlogSection blogPosts={blogPosts} />
        <TravelGuideSection />
      </div>
    </div>
  );
};

export default LandingPage;
