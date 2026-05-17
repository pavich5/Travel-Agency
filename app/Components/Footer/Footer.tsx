import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <p className={styles.kicker}>Globetrotter</p>
          <h3>Designed for travelers who want more than a booking form.</h3>
        </div>
        <p className={styles.copy}>
          Seasonal escapes, smart itineraries, and a calmer way to plan your next trip.
        </p>
      </div>
      <p className={styles.rights}>&copy; {new Date().getFullYear()} Globetrotter. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
