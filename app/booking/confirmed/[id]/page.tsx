"use client"
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css'; 
import Lottie from 'lottie-react';
import successAnimation from '../../../../public/paid.json';

const SuccessPage = () => {
  const search = useSearchParams(); 
  const email = search.get('email');
  const hotelName = search.get('hotelName');
  const hotelCity = search.get('hotelCity');

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className={styles.container}>
      <Lottie animationData={successAnimation} className={styles.animation} />
      <div className={styles.message}>
        <p>Congratulations! You have successfully booked {hotelName} in {hotelCity}.</p>
        <p>An email has been sent to <a href={`mailto:${email}`} onClick={handleEmailClick} className={styles.link}>{email}</a> with the details.</p>
      </div>
    </div>
  );
};

export default SuccessPage;

