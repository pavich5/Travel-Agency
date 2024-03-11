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
  const handlePayWithStripe = () => {
    // Save user data and offer details in local storage
    const dataToSave = {
      firstName,
      lastName,
      email,
      phoneNumber,
      offerDetails
    };
    localStorage.setItem("bookingData", JSON.stringify(dataToSave));

    // Perform additional actions like redirecting to Stripe payment page
    // For now, just log a message
    console.log("Data saved in local storage:", dataToSave);
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
        <Button onClick={() => {
          handlePayWithStripe()
          router.push(`${STRIPE_PAYMENT_LINK}?prefilled_email=${email}`)
        }} className={styles.payButton} type='primary'>Pay with stripe</Button>
        <p className={styles.agreement}>By continuing, you agree with Globetortters's Terms and Conditions, Payments <br/>
        Terms of services,Privace Policy,and Nondiscrimination Policy
        </p>
      </div>
    </div>
  );
};

export default Page;

