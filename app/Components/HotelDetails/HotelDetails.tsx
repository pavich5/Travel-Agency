import { Offer } from '@/app/types';
import Reviews from '@/app/Components/ReviewsComponent/Reviews';
import styles from './HotelDetails.module.css'
const HotelDetails = ({ foundHotel, findCountryName }: { foundHotel: Offer, findCountryName: () => string }) => (
  <div className={styles.foundHotelWrapper}>
    <img
      src={foundHotel.hotelCoverImage}
      alt="hotel image"
      className={styles.hotelCoverImage}
    />
    <div className={styles.bottomLayer}>
      <h3 className={styles.hotelName}>{foundHotel.hotelName} {foundHotel.hotelCity}</h3>
      <small className={styles.hotelPlace}>{findCountryName()}, {foundHotel.hotelCity} - {foundHotel.hotelStars} stars</small>
      <h3 style={{ marginTop: '30px' }}>Amenities</h3>
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

export default HotelDetails;
