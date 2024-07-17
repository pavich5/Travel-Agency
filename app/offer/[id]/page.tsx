"use client";
import { useEffect, useState } from 'react';
import { Button, Image, Tabs, Tooltip } from 'antd';
import styles from './page.module.css';
import { vacationsCategories } from '@/app/Data/data';
import { useRouter } from 'next/navigation';
import DetailItem from '@/app/Components/DetailsItem/DetailItem';
import PriceDetail from '@/app/Components/PriceDetails/PriceDetail';
import Reviews from '@/app/Components/ReviewsComponent/Reviews';
import offerDetailsTabs from '@/app/Components/OfferDetailsTabs';

const { TabPane } = Tabs;
const Page = ({ params }: any) => {
  const router = useRouter()
  const [offerDetails, setOfferDetails] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>('1');
  const taxPercentage = 0.10;
  const taxAmount = offerDetails?.totalCost * taxPercentage;
  const items = offerDetailsTabs(offerDetails)

  useEffect(() => {
    const foundOffer = vacationsCategories.categories.flatMap((oneVacationType) =>
      oneVacationType.countrys.flatMap((oneCountry) =>
        oneCountry.offers.find((offer) => offer.id === Number(params.id))
      )
    );
    const validOffers = foundOffer.filter(offer => offer !== undefined);
    setOfferDetails(validOffers.length > 0 ? validOffers[0] : null);
   
  }, [params.id]);

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const isOfferOver = (startDate: string) => {
    const offerStartDate = new Date(startDate.split("-").reverse().join("-"));
    return offerStartDate < new Date();
  };

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
            <Tooltip title={isOfferOver(offerDetails.startDate) ? "This offer is over" : "Book this offer"}>
              <Button 
                onClick={() => router.push(`/booking/confirmation/${offerDetails.id}`)} 
                className={styles.primaryButton} 
                type='primary' 
                disabled={isOfferOver(offerDetails.startDate)}>
                Book Now
              </Button>
            </Tooltip>
          </div>
          <div className={styles.offerDetailsContainerWrapper}>
            <div className={styles.dividerSection}>
              <DetailItem title="Nights" value={`${offerDetails.duration}, ${offerDetails.person} adult`} />
              <DetailItem title="Departure Time" value={offerDetails.startDate} />
              <DetailItem title="Arrival Time" value={offerDetails.arrivalTime} />
              <DetailItem title="Return Date" value={offerDetails.endDate} />
              <DetailItem title="Cancellation Policy" value={offerDetails.cancellationPolicy.slice(0,30)} />
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
              {items?.map(item => (
                <TabPane tab={item.label} key={item.key}>                  
                  {item?.content}
                </TabPane>
              ))}
            </Tabs>
          </div>
          <Reviews offerDetails={offerDetails} />
          <div className={styles.moreImages}>
            {offerDetails?.additionalImages.map((image: string) => (
              <Image width={300} src={image} key={image} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
