"use client"
import { useUser, useClerk } from "@clerk/nextjs";
import styles from "./page.module.css";
import React, { useState } from 'react';
import { DownOutlined,RightOutlined } from '@ant-design/icons';

interface Payment {
  amount: number;
  currency: string;
  created: number;
  paymentIntentId: string;
  payment_method_types: string[];
  price: string;
  hotelName: string;
  countryName: string;
  startDate: string;
  location: string;
  endDate: string;
  hotelCity: string;
  duration: string;
  qty: string;
  offerImage: string;
}

const UserDetails: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [showPayments, setShowPayments] = useState(true);

  // @ts-ignore
  const payments: Payment[] = user?.unsafeMetadata?.allPayments || [];

  const togglePayments = () => {
    setShowPayments(!showPayments);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <div className={styles.profile}>
          <img
            src={user?.imageUrl}
            alt={user?.fullName || "User Image"}
            className={styles.userImage}
          />
          <div className={styles.userInfo}>
            <h1>{user?.fullName}</h1>
            <p>
              <strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}
            </p>
            <p>
              <strong>Username:</strong> {user?.fullName}
            </p>
            <button onClick={() => signOut()} className={styles.signOutButton}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className={styles.paymentsSection}>
        <h2 onClick={togglePayments} className={styles.paymentsHeader}>
          Payment History ({payments.length}) {showPayments ? (
            <DownOutlined />
          ): (
            <RightOutlined />
          )}
        </h2>
        {showPayments && payments.length > 0 && (
          <div className={styles.paymentsList}>
            {payments.map((payment, index) => (
              <div key={index} className={styles.paymentItem}>
                <img
                  src={payment.offerImage}
                  alt="Offer Image"
                  className={styles.offerImage}
                />
                <div className={styles.paymentDetails}>
                  <p>
                    <strong>Amount:</strong> {payment.amount / 100}{" "}
                    {payment.currency.toUpperCase()}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(payment.created * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>Payment ID:</strong> {payment.paymentIntentId}
                  </p>
                  <p>
                    <strong>Payment Method Types:</strong>{" "}
                    {payment.payment_method_types?.join(", ")}
                  </p>
                  <p>
                    <strong>Hotel Name:</strong> {payment.hotelName}
                  </p>
                  <p>
                    <strong>Country Name:</strong> {payment.countryName}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {payment.startDate}
                  </p>
                  <p>
                    <strong>Location:</strong> {payment.location}
                  </p>
                  <p>
                    <strong>End Date:</strong> {payment.endDate}
                  </p>
                  <p>
                    <strong>Hotel City:</strong> {payment.hotelCity}
                  </p>
                  <p>
                    <strong>Duration:</strong> {payment.duration}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {payment.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {showPayments && payments.length === 0 && (
          <p>No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
