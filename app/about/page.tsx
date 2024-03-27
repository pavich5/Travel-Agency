"use client"
import styles from './page.module.css';
import { motion } from 'framer-motion'; 

const AboutMe = () => {
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={styles.content}
      >
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.text}>
          <p>Welcome to Globetrotter Adventures!</p>
          <p>We are a passionate team of travel enthusiasts dedicated to creating unforgettable experiences for our clients.</p>
          <p>Our mission is to inspire Globetrotter and help you explore the world in style.</p>
          <p>Whether you're dreaming of a tropical beach getaway, an adventurous trek through the mountains, or a cultural exploration of vibrant cities, we're here to turn your travel dreams into reality.</p>
          <p>With our expertise and personalized service, you can trust us to handle every detail of your journey, leaving you free to relax and enjoy the adventure.</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className={styles.imageContainer}
      >
        <img src="https://www.vincentvacations.com/new/images/team-cut3.png" alt="About Us" className={styles.image} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={styles.additionalContent}
      >
        <h2 className={styles.subtitle}>Our Values</h2>
        <ul className={styles.valuesList}>
          <li>Passion for travel</li>
          <li>Commitment to excellence</li>
          <li>Personalized service</li>
          <li>Respect for cultures and communities</li>
          <li>Sustainability and responsible tourism</li>
        </ul>
        <p className={styles.additionalText}>
          At Wanderlust Adventures, we believe in the transformative power of travel. 
          It's not just about visiting new places; it's about connecting with people, 
          immersing yourself in different cultures, and gaining a broader perspective 
          of the world. We strive to create meaningful travel experiences that enrich 
          your life and create lasting memories.
        </p>
      </motion.div>
    </div>
  );
}

export default AboutMe;
