import styles from '../../page.module.css';

const LandingSection = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.eyebrow}>Curated escapes for every season</p>
      <div className={styles.textTitle}>
        <h1>Discover more thoughtful ways to travel.</h1>
        <p>
          Explore city stays, alpine retreats, and sun-soaked coastlines with
          smarter planning and clearer trip details.
        </p>
      </div>
    </div>
  );
};

export default LandingSection;
