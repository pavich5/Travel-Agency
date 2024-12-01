"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import styles from "./page.module.css";
import React, { useState } from "react";
import { vacationsCategories } from "../../mocks/data";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button } from "antd";

interface UserPayment {
  offerId: number;
  created: number;
  payment_method_types?: string[];
}

const UserDetails: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [showPayments, setShowPayments] = useState(true);

  const userPayments: any = user?.unsafeMetadata?.allPayments;
  const foundPayments = vacationsCategories.categories
    .flatMap((category) => category.countrys)
    .flatMap((country) => country.offers)
    .map((offer) => {
      const payment = userPayments?.find(
        (payment: UserPayment) => Number(payment?.offerId) === offer.id
      );
      return payment
        ? {
            ...offer,
            created: payment?.created,
            payment_method_types: payment?.payment_method_types,
          }
        : null;
    })
    .filter((offer) => offer !== null);

  const togglePayments = () => {
    setShowPayments(!showPayments);
  };

  const handleViewOfferDetails = (id?: number) => {
    router.push(`/offer/${id}`);
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
            <Button onClick={() => {
              signOut()
              router.replace('/sign-in')
            }} 
            type="primary">
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.paymentsSection}>
        <h2 onClick={togglePayments} className={styles.paymentsHeader}>
          Payment History ({foundPayments.length})
          {showPayments ? <DownOutlined /> : <RightOutlined />}
        </h2>
        {showPayments && foundPayments.length > 0 && (
          <div className={styles.paymentsList}>
            {foundPayments?.map((payment, index) => (
              <div key={index} className={styles.paymentItem}>
                <img
                  src={payment?.offerImage}
                  alt="Offer Image"
                  className={styles.offerImage}
                />
                <div className={styles.paymentDetails}>
                  <p>
                    <strong>Hotel Name:</strong> {payment?.hotelName}
                  </p>
                  <p>
                    <strong>City:</strong> {payment?.hotelCity}
                  </p>
                  <p>
                    <strong>Payed Amount:</strong> {payment?.totalCost}$
                  </p>
                  <p>
                    <strong>Payment Date:</strong>{" "}
                    {new Date(payment?.created * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {payment?.payment_method_types?.join(", ")}
                  </p>

                  <Button
                    onClick={() => handleViewOfferDetails(payment?.id)}
                    className={styles.viewDetailsButton}
                    type="primary"
                  >
                    View Offer Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showPayments && foundPayments.length === 0 && (
          <p>No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
