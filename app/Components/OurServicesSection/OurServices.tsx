import React from 'react'
import styles from '../../page.module.css'
const OurServices = () => {
  return (
    <div className={styles.servicesWrapper}>
    <div>
      <h1>Our Services</h1>
    </div>
    <div className={styles.serviceCards}>
      <div className={styles.serviceCard}>
        <img
          className={styles.serviceIcon}
          src="https://besttrailstravel.com/wp-content/uploads/2024/02/IMG_3218-5.png"
          alt="City to City Rides"
        />
        <p className={styles.serviceTitle}>City-to-City Rides</p>
        <p className={styles.subTitle}>
          Effortlessly travel between cities with our convenient
          transportation services.
        </p>
      </div>
      <div className={styles.serviceCard}>
        <img
          className={styles.serviceIcon}
          src="https://new.mta.info/sites/default/files/2022-12/Draft%20Plan%20Cover%20-%20Coney%20Island.png"
          alt="Travel Destinations"
        />
        <p className={styles.serviceTitle}>Travel Destinations</p>
        <p className={styles.subTitle}>
          Explore our curated list of top travel destinations and discover
          new adventures.
        </p>
      </div>
      <div className={styles.serviceCard}>
        <img
          className={styles.serviceIcon}
          src="https://eadn-wc01-12838555.nxedge.io/wp-content/uploads/2023/04/OutsideVan_YoastSEO_Image.jpg"
          alt="Car Rentals"
        />
        <p className={styles.serviceTitle}>Van Rentals</p>
        <p className={styles.subTitle}>
          Get behind the wheel and explore the world at your own pace with
          our Van rental options.
        </p>
      </div>
    </div>
  </div>
  )
}

export default OurServices