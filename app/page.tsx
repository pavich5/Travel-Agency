"use client"
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Select, Button } from 'antd';
import { vacationsCategories } from './Data/data';
import { useRouter } from 'next/navigation';


const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState(vacationsCategories.categories.flatMap(category =>
    category.countrys.flatMap(country =>
      country.offers.map(offer => ({
        id: offer.id,
        hotelName: offer.hotelName,
        location: offer.location,
        image: offer.hotelCoverImage,
        duration: offer.duration,
        totalCost: offer.totalCost
      }))
    )
  ));
  const itemsPerPage = 4;
  const router = useRouter()
  // @ts-ignore
  const totalItems = vacationsCategories.categories.flatMap(category => category.countrys).length;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // @ts-ignore
  const currentItems = vacationsCategories.categories.flatMap(category => category.countrys).slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleNextPage = () => {
    if (indexOfLastItem >= totalItems) return;
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleSearch = () => {
    const filteredResults = vacationsCategories.categories.flatMap(category =>
      category.countrys.flatMap(country =>
        country.offers.filter(offer =>
          offer.hotelName.toLowerCase().includes(searchValue.toLowerCase())
        ).map(offer => ({
          id: offer.id,
          hotelName: offer.hotelName,
          location: offer.location,
          image: offer.hotelCoverImage,
          duration: offer.duration,
          totalCost: offer.totalCost
        }))
      )
    );
    setFilteredData(filteredResults);
  };

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    handleSearch();
  };

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={styles.homePageWrapper}>
      <div>
      <div className={styles.mainSection} style={{backgroundImage: isMobile ? 'url(https://images.unsplash.com/photo-1561571994-3c61c554181a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VtbWVyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)' : ''}}>
          <div className={styles.wrapper}>
            <div className={styles.textTitle}>
              <h1>Discover the world with Globetrotter</h1>
            </div>

            <div className={styles.inputWrapper}>
              <Select
                mode="tags"
                placeholder="Search destination, trips, or experiences"
                style={{ width: '100%', height: "37px" }}
                onSearch={handleInputChange}
                tokenSeparators={[',']}
                options={filteredData.map((item: any) => ({
                  value: item.hotelName,
                  label: (
                    <div onClick={() => router.push(`/offer/${item.id}`)} className={styles.searchItem} key={`${item.hotelName}-${item.id}`}>
                      <img src={item.image} alt="" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                      <div className={styles.searchItemInfo}>
                        <span>{item.hotelName}</span>
                        <span>{item.location}</span>
                        <small>Duration: {item.duration}</small>
                        <small>Price: {item.totalCost}$</small>
                      </div>
                    </div>
                  ),
                }))}
                suffixIcon={<Button onClick={() => router.push(`/search?searchValue=${searchValue}`)} type='primary'>Search</Button>}
              />
            </div>
          </div>
        </div>
        <div className={styles.vaicationsWrapper}>
          <div className={styles.vaicationButtons}>
            {vacationsCategories.categories.map((vacation, index) => (
              <button onClick={() => router.push(`vacation/list/${vacation.name.split(' ')[0]}`)} key={index}>{vacation.name}</button>
            ))}
          </div>
          <div className={styles.vacationCardsWrapper}>
          <h2>Vaication Types</h2>
            {vacationsCategories.categories.map((category, index) => (
              <div onClick={() => {
                router.push(`vacation/list/${category.name.split(' ')[0]}`);
              }} key={index} className={styles.oneCategoryCard} style={{ backgroundImage: `url(${category.image})` }}>
                <p className={styles.categoryName}>{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.availableVacationsWrapper}>
          <h2>Available Countrys</h2>
          <div className={styles.availableList}>
            {currentItems.map((vacation: any, index) => (
              <div onClick={() => router.push(`vacation/${vacation.countryName}`)} key={index} className={styles.oneVacationCard} style={{ backgroundImage: `url(${vacation.image})` }}>
                <p className={styles.vacationName}>{vacation.countryName}</p>
                <p>{vacation.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.pagination}>
          <LeftOutlined onClick={handlePreviousPage} className={currentPage === 1 ? styles.disabled : ''} />
          {pageNumbers.map(page => (
            <span key={page} className={page === currentPage ? styles.currentPage : ''} onClick={() => setCurrentPage(page)}>{page}</span>
          ))}
          <RightOutlined onClick={handleNextPage} className={indexOfLastItem >= totalItems ? styles.disabled : ''} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
