"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import Lottie from 'lottie-react';
import cancelledAnimation from '../../public/cancelled.json';
import { Button } from 'antd';

const CancelledPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>Payment Cancelled</h1>
          <p className={styles.message}>We're sorry to see you go. Your payment has been cancelled.</p>
          <Button type='primary'onClick={() => router.push('/')}>Return to Homepage</Button>
        </div>
        <div className={styles.animation}>
          <Lottie className={styles.lottieAnimation} animationData={cancelledAnimation} />
        </div>
      </div>
      <div className={styles.bgImage}>
        <Image src="/background.jpg" alt="Background" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default CancelledPage;