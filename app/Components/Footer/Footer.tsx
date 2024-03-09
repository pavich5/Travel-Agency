import React from 'react';
import { FacebookOutlined, ClockCircleOutlined, TeamOutlined, InstagramOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.workingHours}>
          <ClockCircleOutlined className={styles.icon} />
          <span className={styles.info}>Working Hours:</span>
          <div className={styles.days}>
            <div>
              <span className={styles.day}>Monday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div>
              <span className={styles.day}>Tuesday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div>
              <span className={styles.day}>Wednesday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div>
              <span className={styles.day}>Thursday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div>
              <span className={styles.day}>Friday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div>
              <span className={styles.day}>Saturday:</span>
              <span>Closed</span>
            </div>
            <div>
              <span className={styles.day}>Sunday:</span>
              <span>Closed</span>
            </div>
          </div>
        </div>
        <div className={styles.locations}>
          <span className={styles.info}>Locations:</span>
          <ul className={styles.locationList}>
            <li>1234 Traveler's Way, City1, Country1</li>
          </ul>
        </div>
        <div className={styles.staff}>
          <TeamOutlined className={styles.icon} />
          <span className={styles.info}>Our Team:</span>
          <ul className={styles.teamList}>
            <li>John Doe - Travel Consultant</li>
            <li>Jane Smith - Customer Service</li>
            <li>Michael Johnson - Tour Guide</li>
            <li>Sarah Lee - Sales Manager</li>
            <li>David Brown - Marketing Specialist</li>
            <li>Emily Taylor - Reservation Agent</li>
          </ul>
        </div>
        <div className={styles.socialMedia}>
          <Link href="https://facebook.com">
            <FacebookOutlined className={styles.icon} />
          </Link>
          <Link href="https://instagram.com">
            <InstagramOutlined className={styles.icon} />
          </Link>
          <Link href="https://twitter.com">
            <TwitterOutlined className={styles.icon} />
          </Link>
          <Link href="https://linkedin.com">
            <LinkedinOutlined className={styles.icon} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
