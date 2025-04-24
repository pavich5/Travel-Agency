"use client"
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Tabs, Table } from "antd";
import { vacationsCategories } from '@/app/mocks/data';
import moment from 'moment';
import OfferFilters from '@/app/Components/OfferFilters/OfferFilters';
import { transformOffersData } from '@/app/utils/helper';
import useTableColumns from '@/app/Components/TableColumns';
import { OfferColumn, Filters } from '@/app/types';
const { TabPane } = Tabs;


const Page = ({ params }: any) => {
  const [activeTabKey, setActiveTabKey] = useState<string | null>(params.id);
  const [countryVacations, setCountryVacations] = useState<any>();
  const [selectedCityOffers, setSelectedCityOffers] = useState<any[]>([]);
  const [tableData, setTableData] = useState<OfferColumn[] | undefined>()
  const [filters, setFilters] = useState<Filters>({
    startDate: null,
    endDate: null,
    minPrice: null,
    maxPrice: null,
    starRating: [],
    nights: null,
    transportation: [],
    mealPlan: [],
    roomType: []
  });
  const columns = useTableColumns()
  const data: OfferColumn[] = selectedCityOffers.length
    ? transformOffersData(selectedCityOffers)
    : transformOffersData(countryVacations?.offers);

  useEffect(() => {
    const foundCountry = vacationsCategories.categories.flatMap((vacationType) =>
      vacationType.countrys.find((oneVacation) => oneVacation.countryName === params.name)
    );
    setCountryVacations(foundCountry.find((country) => country?.countryName === params.name));
  }, [params.name]);

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    const hotelsForCity = countryVacations?.offers.filter((oneOffer: any) => oneOffer.hotelCity === key) || [];
    setSelectedCityOffers(hotelsForCity);
  };

  const handleApplyFilters = () => {
    const filteredData = data.filter((offer: any) => {
      return (
        (!filters.minPrice || offer.Price >= filters.minPrice) &&
        (!filters.maxPrice || offer.Price <= filters.maxPrice) &&
        (!filters.starRating.length || filters.starRating.includes(offer.Stars.toString())) &&
        (!filters.nights || parseInt(offer.Nights.split(' ')[0]) === filters.nights) &&
        (!filters.mealPlan.length || filters.mealPlan.includes(offer.mealPlan)) &&
        (!filters.roomType.length || filters.roomType.includes(offer.roomType)) &&
        (!filters.transportation.length || filters.transportation.includes(offer.transportation)) &&
        (!filters.startDate || !filters.endDate ||
          (moment(offer.Start, 'DD-MM-YYYY').isSameOrAfter(moment(filters.startDate, 'DD-MM-YYYY'), 'day') &&
            moment(offer.End, 'DD-MM-YYYY').isSameOrBefore(moment(filters.endDate, 'DD-MM-YYYY'), 'day')))
      );
    }).map((filteredOffer, index) => ({ ...filteredOffer, key: index.toString() }));

    setTableData(filteredData);
  };


  return (
    <div className={styles.countryOffersWrapper}>
      <div>
        <h2>{params.name} Trips</h2>
      </div>
      {/* <OfferFilters filters={filters} handleApplyFilters={handleApplyFilters} setFilters={setFilters} /> */}
      <div className={styles.tableWrapper}>
        <Tabs style={{padding: '5px'}} activeKey={activeTabKey ? activeTabKey : "0"} onChange={handleTabChange}>
          {countryVacations?.offers?.reduce((uniqueCities: string[], offer: any) => {
            if (!uniqueCities.includes(offer.hotelCity)) {
              uniqueCities.push(offer.hotelCity);
            }
            return uniqueCities;
          }, []).map((city: string, index: number) => (
            <TabPane tab={city} key={index.toString()}>
              <Table style={{ overflow: 'auto' }} pagination={{ pageSize: 5 }}
                columns={columns} dataSource={tableData ? tableData.filter(offer => offer.City === city) : data.filter(offer => offer.City === city)} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default Page;