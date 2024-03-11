"use client"
import { STRIPE_PAYMENT_LINK, vacationsCategories } from '@/app/Data/data';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const Page = ({ params }: any) => {
  const [offerDetails, setOfferDetails] = useState<any>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter()
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
  const idToPaymentLinkMap = new Map([
    [1, 'https://buy.stripe.com/test_3csg1Z9IS8Zi4M0eUW'],
    [2, 'https://example.com/page2'],
    [3, 'https://example.com/page3'],
  ]);
  const handlePayWithStripe = () => {
    const dataToSave = {
      firstName,
      lastName,
      email,
      phoneNumber,
      offerDetails
    };
    localStorage.setItem("bookingData", JSON.stringify(dataToSave));
    const paymentLink = idToPaymentLinkMap.get(offerDetails.id);
    if (paymentLink) {
      router.push(`${paymentLink}?prefilled_email=${email}`);
    } else {
      console.error("Payment link not found for offer ID:", offerDetails.id);
    }
    console.log("Data saved in local storage:", dataToSave);
  };

  const handleContactUsOnViber = () => {
    window.location.href = "viber://add?number=1234567890";
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Book your trip</h1>
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
        <Button onClick={() =>
          handlePayWithStripe()
        } className={styles.payButton} type='primary'>Pay with stripe</Button>
        <Button onClick={handleContactUsOnViber} className={styles.payButton} type='default'>Contact us on Viber</Button>
        <p className={styles.agreement}>By continuing, you agree with Globetortters's Terms and Conditions, Payments <br />
          Terms of services,Privace Policy,and Nondiscrimination Policy
        </p>
      </div>
    </div>
  );
};

export default Page;

