import React from 'react';
import styles from './Footer.module.css';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.waves}>
        <div className={styles.wave} id={styles.wave1}></div>
        <div className={styles.wave} id={styles.wave2}></div>
        <div className={styles.wave} id={styles.wave3}></div>
        <div className={styles.wave} id={styles.wave4}></div>
      </div>
      <p>&copy;2024 Globetrotter | All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
