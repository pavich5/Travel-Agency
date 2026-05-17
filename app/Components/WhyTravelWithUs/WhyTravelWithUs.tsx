import React from 'react';
// @ts-ignore
import styles from '../../page.module.css';
const WhyTravelWithUs = () => {
  return (
    <div className={styles.whyTravelWrapper}>
    <div className={styles.sectionHeadingBlock}>
      <p className={styles.eyebrow}>Why us</p>
      <h1>Modern planning, calmer decision-making.</h1>
    </div>
    <div className={styles.featureCards}>
      <div className={styles.featureCard}>
        <img
          className={styles.featureIcon}
          src="https://1955812923.rsc.cdn77.org/dori.mk/sites/template/docs/bsmade/expr_eb479fb57c2c561cb930860051c2053f.svg"
          alt=""
        />
        <p className={styles.featureTitle}>Transparent pricing</p>
        <p className={styles.subTitle}>
          Clear trip costs, realistic package details, and fewer surprises at checkout.
        </p>
      </div>
      <div className={styles.featureCard}>
        <img
          className={styles.featureIcon}
          src="https://1955812923.rsc.cdn77.org/dori.mk/sites/template/docs/bsmade/expr_e286ea06cf3816a292679e914a5cd70e.svg"
          alt=""
        />
        <p className={styles.featureTitle}>Smoother logistics</p>
        <p className={styles.subTitle}>
          Airport transfers, local transport highlights, and practical trip flow built in.
        </p>
      </div>
      <div className={styles.featureCard}>
        <img
          className={styles.featureIcon}
          src="https://1955812923.rsc.cdn77.org/dori.mk/sites/template/docs/bsmade/expr_1e356c453302e7e9a4491513722ee1ca.svg"
          alt=""
        />
        <p className={styles.featureTitle}>Human-first guidance</p>
        <p className={styles.subTitle}>
          Helpful recommendations, smarter planning tools, and offers worth comparing.
        </p>
      </div>
    </div>
  </div>
  )
}

export default WhyTravelWithUs
