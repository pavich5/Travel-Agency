import React from 'react'
import styles from '../../page.module.css'
const OurServices = () => {
  return (
    <div className={styles.servicesWrapper}>
    <div className={styles.sectionHeadingBlock}>
      <p className={styles.eyebrow}>Services</p>
      <h1>Everything around the trip, not just the booking.</h1>
    </div>
    <div className={styles.serviceCards}>
      <div className={styles.serviceCard}>
        <img
          className={styles.serviceIcon}
          src="https://besttrailstravel.com/wp-content/uploads/2024/02/IMG_3218-5.png"
          alt="City to City Rides"
        />
        <p className={styles.serviceTitle}>Intercity transfers</p>
        <p className={styles.subTitle}>
          Move between hubs and resorts with practical transportation options.
        </p>
      </div>
      <div className={styles.serviceCard}>
        <img
          className={styles.serviceIcon}
          src="https://new.mta.info/sites/default/files/2022-12/Draft%20Plan%20Cover%20-%20Coney%20Island.png"
          alt="Travel Destinations"
        />
        <p className={styles.serviceTitle}>Curated destination picks</p>
        <p className={styles.subTitle}>
          Browse destinations chosen for seasonality, atmosphere, and value.
        </p>
      </div>
      <div className={styles.serviceCard}>
        <img
          className={styles.serviceIcon}
          src="https://eadn-wc01-12838555.nxedge.io/wp-content/uploads/2023/04/OutsideVan_YoastSEO_Image.jpg"
          alt="Car Rentals"
        />
        <p className={styles.serviceTitle}>Flexible road travel</p>
        <p className={styles.subTitle}>
          Add room to roam with private rides and self-drive options where it makes sense.
        </p>
      </div>
    </div>
  </div>
  )
}

export default OurServices
