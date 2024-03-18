// @ts-ignore
"use client";
import React, { useEffect, useState } from 'react';
import { Button, Card, Image, Rate } from 'antd';
import styles from './page.module.css';
import { vacationsCategories } from '@/app/Data/data';
import { useRouter } from 'next/navigation';
import { Tabs } from 'antd';
import { Review } from '@/app/types';
import DetailItem from '@/app/Components/DetailsItem/DetailItem';
import PriceDetail from '@/app/Components/PriceDetails/PriceDetail';
import Reviews from '@/app/Components/ReviewsComponent/Reviews';
const { TabPane } = Tabs;

const Page = ({ params }: any) => {
  const router = useRouter()
  const [offerDetails, setOfferDetails] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const taxPercentage = 0.10;
  const taxAmount = offerDetails?.totalCost * taxPercentage;

  useEffect(() => {
    const foundOffer = vacationsCategories.categories.flatMap((oneVacationType) =>
      oneVacationType.countrys.flatMap((oneCountry) =>
        oneCountry.offers.find((offer) => offer.id === Number(params.id))
      )
    );
    const validOffers = foundOffer.filter(offer => offer !== undefined);
    console.log(validOffers)
    if (validOffers.length > 0) {
      setOfferDetails(validOffers[0]);
    } else {
      setOfferDetails(null);
    }
  }, [params.id]);


  const onChange = (key: string) => {
    setActiveTab(key);
  };
  const items = [
    {
      key: '1',
      label: 'Room Type',
      content: (
        <Card title="Room Type" className={styles.card}>
          <div className={styles.roomType}>
            <div>
              <Image src={offerDetails?.roomImage} alt="roomImage" />
            </div>
            <div>
              <h3>{offerDetails?.roomType}</h3>
              <p>A cozy and spacious room with modern amenities.</p>
            </div>
          </div>
        </Card>

      ),
    },
    {
      key: '2',
      label: 'Meal Plan',
      content: (
        <Card title="Meal Plan" className={styles.card}>
          <p>{offerDetails?.mealPlan}</p>
        </Card>
      ),
    },
    {
      key: '3',
      label: 'Activities',
      content: (
        <Card title="Activities" className={styles.card}>
          <ul>
            {offerDetails?.activities.map((activity: any) => (
              <li key={activity.name} className={styles.activity}>
                <p>{activity.name}</p>
                <p>{activity.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      ),
    },
    {
      key: '4',
      label: 'Transportation',
      content: (
        <Card title="Transportation" className={styles.card}>
          <p>{offerDetails?.transportation}</p>
        </Card>
      ),
    },
    {
      key: '5',
      label: 'Trip Details',
      content: (
        <Card title="Trip Details" className={styles.card}>
          <p>We will meet at the hotel lobby at 9:00 AM on the first day of the trip.</p>
          <p>The trip will officially start with a walking tour of the city's historic landmarks.</p>
          <p>Transportation will be provided for all group activities and excursions.</p>
          <p>Please ensure you have comfortable walking shoes and a reusable water bottle.</p>
        </Card>
      ),
    }
  ];
  return (
    <div className={styles.offerDetailsContainer}>
      {offerDetails && (
        <div className={styles.wrapper}>
          <div className={styles.hotelCoverImage}>
            <img src={offerDetails.offerImage} alt="hotel cover image" />
          </div>
          <div className={styles.hotelOffer}>
            <h2>Essential Details for {offerDetails.hotelCity} Journey</h2>
            <p>{offerDetails.hotelStars}-star hotel, {offerDetails.hotelName} - {offerDetails.hotelCity}</p>
          </div>
          <div className={styles.buttonsContainer}>
            <Button onClick={() => router.push(`/hotel/${offerDetails.hotelName}`)} className={styles.primaryButton} type='primary'>
              View Hotel
            </Button>
            <Button onClick={() => router.push(`/booking/confirmation/${offerDetails.id}`)} className={styles.primaryButton} type='primary'>
              Book Now
            </Button>
          </div>
          <div className={styles.offerDetailsContainerWrapper}>
            <div className={styles.dividerSection}>
              <DetailItem title="Nights" value={`${offerDetails.duration}, ${offerDetails.person} adult`} />
              <DetailItem title="Departure Time" value={offerDetails.startDate} />
              <DetailItem title="Arrival Time" value={offerDetails.arrivalTime} />
              <DetailItem title="Cancellation Policy" value={offerDetails.cancellationPolicy} />
            </div>
            <div className={styles.dividerSection}>
              <h2>Price Breakdown</h2>
              <PriceDetail title={offerDetails.duration} value={`${offerDetails.totalCost}$`} />
              <PriceDetail title="Taxes and Fees" value={`${taxAmount}$`} />
              <PriceDetail title="Total" value={`${taxAmount + offerDetails.totalCost}$`} />
            </div>
          </div>
          <div className={styles.tabs}>
            <Tabs defaultActiveKey="1" onChange={onChange} activeKey={activeTab}>
              {items.map(item => (
                <TabPane tab={item.label} key={item.key}>
                  {item.content}
                </TabPane>
              ))}
            </Tabs>
          </div>
          <Reviews offerDetails={offerDetails} />
          <div className={styles.moreImages}>
            {offerDetails.additionalImages.map((image: string) => (
              <Image width={300} src={image} key={image} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
