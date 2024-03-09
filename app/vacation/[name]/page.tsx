"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Tabs, Tooltip } from "antd";
import { vacationsCategories } from '@/app/Data/data';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface Offer {
  id: any;
  City: string;
  key: string;
  Date: string;
  Price: number;
  Hotel: string;
  HotelName: string;
  Stars: number;
  Nights: number;
  Start: string;
  End: string;
}
const { TabPane } = Tabs;


const Page = ({ params }: any) => {
  const router = useRouter()
  const [activeTabKey, setActiveTabKey] = useState<string | null>(params.id);
  const [countryVacations, setCountryVacations] = useState<any>();
  const [selectedCityOffers, setSelectedCityOffers] = useState<any[]>([]);

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

  const columns: TableProps<Offer>['columns'] = [
    {
      title: 'Hotel',
      dataIndex: 'Hotel',
      key: 'Hotel',
      render: (text, record) => (
        <a href={`/hotel/${record.HotelName}`}>
          <Tooltip title="Click to see hotel details">
            <img className={styles.tableHotelImage} src={text} alt="Hotel" />
          </Tooltip>
        </a>
      ),
    },
    {
      title: 'Hotel Name',
      dataIndex: 'HotelName',
      key: 'HotelName',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      render: (text) => <div>{text}$</div>,
    },
    {
      title: 'Stars',
      dataIndex: 'Stars',
      key: 'Stars',
      render: (text) => <button className={styles.tableButton}>{text} <StarOutlined /></button>,
    },
    {
      title: 'Nights',
      dataIndex: 'Nights',
      key: 'Nights',
    },
    {
      title: 'Start',
      dataIndex: 'Start',
      key: 'Start',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'End',
      dataIndex: 'End',
      key: 'End',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Transportation',
      dataIndex: 'transportation',
      key: 'transportation',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Meal Plan',
      dataIndex: 'mealPlan',
      key: 'mealPlan',
      render: (text) => <div style={{width:"65px"}}>{text}</div>,
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      key: 'roomType',
      render: (text) => <div>{text}</div>,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <button onClick={() => {
          router.push(`/offer/${record.id}`)
        }} className={styles.tableButtonBook}>View Details</button>
      ),
    },
  ];
  
  const data: Offer[] = selectedCityOffers.length
    ? selectedCityOffers.map((offer: any) => ({
      key: offer.hotelName,
      Date: `${offer.startDate} - ${offer.endDate}`,
      Price: offer.totalCost,
      Hotel: offer.hotelCoverImage,
      HotelName: offer.hotelName, 
      City: offer.hotelCity,
      Stars: offer.hotelStars,
      Nights: offer.duration,
      Start: offer.startDate,
      End: offer.endDate,
      id: offer.id,
      transportation: offer.transportation,
      mealPlan: offer.mealPlan,
      roomType: offer.roomType
    }))
    : countryVacations?.offers.map((offer: any) => ({
      key: offer.hotelName,
      Date: `${offer.startDate} - ${offer.endDate}`,
      Price: offer.totalCost,
      Hotel: offer.hotelCoverImage,
      HotelName: offer.hotelName, 
      City: offer.hotelCity,
      Stars: offer.hotelStars,
      Nights: offer.duration,
      Start: offer.startDate,
      End: offer.endDate,
      id: offer.id,
      transportation: offer.transportation,
      mealPlan: offer.mealPlan,
      roomType: offer.roomType
    })) || [];
  

    return (
      <div className={styles.countryOffersWrapper}>
        <div>
          <h2>{params.name} Trips</h2>
        </div>
        <div>
          <Tabs activeKey={activeTabKey ? activeTabKey : "0"} onChange={handleTabChange}>
            {countryVacations?.offers?.reduce((uniqueCities: string[], offer: any) => {
              if (!uniqueCities.includes(offer.hotelCity)) {
                uniqueCities.push(offer.hotelCity);
              }
              return uniqueCities;
            }, []).map((city: string, index: number) => (
              <TabPane tab={city} key={index.toString()}>
                  <Table pagination={{ pageSize: 5 }}
                    columns={columns} dataSource={data.filter(offer => offer.City === city)} />
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    );
}

export default Page;
