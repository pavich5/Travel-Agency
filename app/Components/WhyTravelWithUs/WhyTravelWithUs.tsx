import React from 'react';
// @ts-ignore
import styles from '../../page.module.css';
const WhyTravelWithUs = () => {
  return (
    <div className={styles.whyTravelWrapper}>
    <div>
      <h1>Why Travel with us?</h1>
    </div>
    <div className={styles.featureCards}>
      <div className={styles.featureCard}>
        <img
          className={styles.featureIcon}
          src="https://1955812923.rsc.cdn77.org/dori.mk/sites/template/docs/bsmade/expr_eb479fb57c2c561cb930860051c2053f.svg"
          alt=""
        />
        <p className={styles.featureTitle}>Affordable Prices</p>
        <p className={styles.subTitle}>
          We offer the best services for the cheapest prices
        </p>
      </div>
      <div className={styles.featureCard}>
        <img
          className={styles.featureIcon}
          src="https://1955812923.rsc.cdn77.org/dori.mk/sites/template/docs/bsmade/expr_e286ea06cf3816a292679e914a5cd70e.svg"
          alt=""
        />
        <p className={styles.featureTitle}>Convenient Transportation</p>
        <p className={styles.subTitle}>
          Enjoy comfortable and reliable transportation options
        </p>
      </div>
      <div className={styles.featureCard}>
        <img
          className={styles.featureIcon}
          src="https://1955812923.rsc.cdn77.org/dori.mk/sites/template/docs/bsmade/expr_1e356c453302e7e9a4491513722ee1ca.svg"
          alt=""
        />
        <p className={styles.featureTitle}>Expert Guidance</p>
        <p className={styles.subTitle}>
          Our experienced guides will ensure you have an unforgettable
          journey
        </p>
      </div>
    </div>
  </div>
  )
}

export default WhyTravelWithUs