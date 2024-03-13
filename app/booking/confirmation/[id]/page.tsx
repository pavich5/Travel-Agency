"use client"
import { vacationsCategories } from '@/app/Data/data';
import { Button, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useUser } from '@clerk/nextjs';
import { loadStripe } from "@stripe/stripe-js";

const Page = ({ params }: any) => {
  const { user } = useUser();
  const [offerDetails, setOfferDetails] = useState<any>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const foundOffer = vacationsCategories.categories.flatMap((oneVacationType) =>
      oneVacationType.countrys.flatMap((oneCountry) =>
        oneCountry.offers.find((offer) => offer.id === Number(params.id))
      )
    );
    const validOffers = foundOffer.filter(offer => offer !== undefined);
    console.log(validOffers)
    if (validOffers.length > 0) {
      setOfferDetails(validOffers[0]);
    } else {
      setOfferDetails(null);
    }
  }, [params.id]);
  const handlePayWithStripe = async () => {
    if (!email) {
      notification.warning({
        message: 'Email Required',
        description: 'Please enter your email before proceeding with the payment.',
      });
      return;
    }
  
    try {
      const response = await fetch("https://travel-agency-2.vercel.app/api/getStripeApi");
      if (!response.ok) {
        throw new Error(`Failed to fetch STRIPE_ACCESS_KEY! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        const stripePromise = await loadStripe(data);
  
        const createSessionResponse = await fetch(
          "https://travel-agency-2.vercel.app/api/createlink",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: offerDetails, qty: "1", price: offerDetails.totalCost * 100, email }),
          }
        );
        if (!createSessionResponse.ok) {
          throw new Error(`Failed to create Stripe session! Status: ${createSessionResponse.status}`);
        }
        const session = await createSessionResponse.json();
  
        stripePromise?.redirectToCheckout({
          sessionId: session.id,
        });
      } else {
        console.error("Stripe Access Key is undefined");
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  const handleContactUsOnViber = () => {
    window.location.href = "viber://add?number=1234567890";
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Book your trip to {offerDetails?.hotelCity}</h1>
        <div className={styles.inputGroup}>
          <Input className={styles.firstNameInput} placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <Input className={styles.input} placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <Input className={styles.input} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <Input className={styles.input} placeholder='Phone Number' type='number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <Button
          onClick={async () => {
             handlePayWithStripe();
             user?.update({
              unsafeMetadata: {
                firstName,
                lastName,
                email,
                phoneNumber,
                payedOffers: [
                  {
                    id: offerDetails.id,
                    name: offerDetails.name
                  }
                ]
              }
            });
          }}
          className={styles.payButton}
          type='primary'
        >
          Pay with Stripe
        </Button>

        <Button onClick={handleContactUsOnViber} className={styles.payButton} type='default'>Contact us on Viber</Button>
        <p className={styles.agreement}>By continuing, you agree with Globetortters's Terms and Conditions, Payments <br />
          Terms of services,Privace Policy,and Nondiscrimination Policy
        </p>
      </div>
    </div>
  );
};

export default Page;

