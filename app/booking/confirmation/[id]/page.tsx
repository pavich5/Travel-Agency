"use client"
import  { useEffect, useState } from 'react';
import { Button, Input, notification } from 'antd';
import styles from './page.module.css';
import { loadStripe } from "@stripe/stripe-js";
import { vacationsCategories } from '@/app/Data/data';
import { useUser } from '@clerk/nextjs';

const Page = ({ params }: any) => {
  const { user } = useUser();
  const [offerDetails, setOfferDetails] = useState<any>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchOfferDetails(params.id);
  }, [params.id]);

  const fetchOfferDetails = async (id: string) => {
    try {
      const foundOffer = vacationsCategories.categories.flatMap((oneVacationType) =>
        oneVacationType.countrys.flatMap((oneCountry) =>
          oneCountry.offers.find((offer) => offer.id === Number(id))
        )
      );
      const validOffers = foundOffer.filter(offer => offer !== undefined);
      setOfferDetails(validOffers.length > 0 ? validOffers[0] : null);
    } catch (error) {
      console.error("Error fetching offer details:", error);
    }
  };
  const handlePayWithStripe = async () => {
    if (!email) {
      notification.warning({
        message: 'Email Required',
        description: 'Please enter your email before proceeding with the payment.',
      });
      return;
    }

    try {
      const stripeKeyResponse = await fetch("https://travel-agency-plum.vercel.app/api/getStripeApi");
      if (!stripeKeyResponse.ok) {
        throw new Error(`Failed to fetch STRIPE_ACCESS_KEY! Status: ${stripeKeyResponse.status}`);
      }
      const stripeKeyData = await stripeKeyResponse.json();
      const stripe = await loadStripe(stripeKeyData);

      const createSessionResponse = await fetch(
        "https://travel-agency-plum.vercel.app/api/createlink",
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

      stripe?.redirectToCheckout({
        sessionId: session.id,
      });
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
        <div className={styles.wrapper}>
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
          <Button onClick={handlePayWithStripe} className={styles.payButton} type='primary'>Pay with Stripe</Button>
          <Button onClick={handleContactUsOnViber} className={styles.payButton} type='default'>Contact us on Viber</Button>
          <p className={styles.agreement}>
            By continuing, you agree with Globetortters's Terms and Conditions, Payments <br />
            Terms of services,Privace Policy,and Nondiscrimination Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
