"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Button, Tabs, Tooltip,DatePicker } from "antd";
import { vacationsCategories } from '@/app/Data/data';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import moment from 'moment';

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
      render: (text) => <div style={{ width: '90px' }}>{text}</div>,
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      sorter: (a, b) => a.Price - b.Price,
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div>{text}$</div>,
      filters: [
        { text: '100', value: 100 },
        { text: '200', value: 200 },
        { text: '300', value: 300 },
        { text: '400', value: 400 },
        { text: '500', value: 500 },
        { text: '600', value: 600 },
        { text: '700', value: 700 },
        { text: '800', value: 800 },
        { text: '900', value: 900 },
        { text: '1000', value: 1000 },
        { text: '1000+', value: 1001 }, 
      ],
      onFilter: (value, record) => {
        if (value === 1001) {
          return record.Price >= 1000;
        } else {
          return record.Price === value;
        }
      },
    },
    
    {
      title: 'Stars',
      dataIndex: 'Stars',
      key: 'Stars',
      sorter: (a, b) => a.Stars - b.Stars,
      sortDirections: ['ascend', 'descend'],
      filters: [
        { text: '1 star', value: 1 },
        { text: '2 stars', value: 2 },
        { text: '3 stars', value: 3 },
        { text: '4 stars', value: 4 },
        { text: '5 stars', value: 5 },
      ],
      onFilter: (value, record) => {
        // @ts-ignore
        const numNights = parseInt(record.Nights.split(' ')[0]);
        return numNights === value;
      },
      render: (text) => (
        <button className={styles.tableButton}>
          {text} <StarOutlined />
        </button>
      ),
    },
    {
      title: 'Nights',
      dataIndex: 'Nights',
      key: 'Nights',
      sorter: (a, b) => {
                // @ts-ignore
        const numA = parseInt(a.Nights.split(' ')[0]);
                // @ts-ignore
        const numB = parseInt(b.Nights.split(' ')[0]);
        return numA - numB;
      },
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div style={{ width: '50px' }}>{text}</div>,
      filters: [
        { text: '1 night', value: 1 },
        { text: '2 nights', value: 2 },
        { text: '3 nights', value: 3 },
        { text: '4 nights', value: 4 },
        { text: '5 nights', value: 5 },
        { text: '6 nights', value: 6 },
        { text: '7+ nights', value: 7 }, 
      ],
      onFilter: (value, record) => {
              // @ts-ignore
        const numNights = parseInt(record.Nights.split(' ')[0]);
        if (value === 7) {
          return numNights >= value; // Filter for 7 or more nights
        } else {
          return numNights === value;
        }
      },
    },
    {
      title: 'Start',
      dataIndex: 'Start',
      key: 'Start',
      sorter: (a, b) => moment(a.Start, 'DD-MM-YYYY').valueOf() - moment(b.Start, 'DD-MM-YYYY').valueOf(),
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div style={{ width: '100px' }}>{text}</div>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
                  // @ts-ignore
            value={selectedKeys && selectedKeys.length ? moment(selectedKeys[0], 'DD-MM-YYYY') : null}
            format="DD-MM-YYYY"
            onChange={(date) => setSelectedKeys(date ? [date.format('DD-MM-YYYY')] : [])}
            style={{ marginBottom: 8, display: 'block' }}
            readOnly
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            OK
          </Button>
          <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
                // @ts-ignore
        const startDate = moment(value, 'DD-MM-YYYY');
        const recordDate = moment(record.Start, 'DD-MM-YYYY');
        return recordDate.isSame(startDate, 'day');
      },
    },
    
    {
      title: 'End',
      dataIndex: 'End',
      key: 'End',
      sorter: (a, b) => moment(a.End, 'DD-MM-YYYY').valueOf() - moment(b.End, 'DD-MM-YYYY').valueOf(),
      sortDirections: ['ascend', 'descend'],
      render: (text) => <div style={{ width: '100px' }}>{text}</div>,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
                  // @ts-ignore
            value={selectedKeys && selectedKeys.length ? moment(selectedKeys[0], 'DD-MM-YYYY') : null}
            format="DD-MM-YYYY"
            onChange={(date) => setSelectedKeys(date ? [date.format('DD-MM-YYYY')] : [])}
            style={{ marginBottom: 8, display: 'block' }}
            readOnly
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            OK
          </Button>
          <Button onClick={() => clearFilters?.()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
                // @ts-ignore
        const endDate = moment(value, 'DD-MM-YYYY');
        const recordDate = moment(record.End, 'DD-MM-YYYY');
        return recordDate.isSame(endDate, 'day');
      },
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
      render: (text) => <div style={{ width: '65px' }}>{text}</div>,
    },
    {
      title: 'Room Type',
      dataIndex: 'roomType',
      key: 'roomType',
      render: (text) => <div style={{width: '105px'}}>{text}</div>,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (text, record) => (
        <button onClick={() => router.push(`/offer/${record.id}`)} className={styles.tableButtonBook}>
          View Details
        </button>
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
        <div className={styles.tableWrapper}>
          <Tabs activeKey={activeTabKey ? activeTabKey : "0"} onChange={handleTabChange} className='antdTable' style={{overflow:'auto'}}>
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
