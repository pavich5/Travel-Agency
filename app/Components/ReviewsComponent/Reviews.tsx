import React from 'react';
import { Rate } from 'antd';
import { Review, Offer } from '../../types/index';
import styles from './page.module.css'


interface ReviewsProps {
  offerDetails: Offer;
}

const Reviews = ({ offerDetails } : ReviewsProps) => {
  return (
    <div className={styles.reviewsWrapper}>
    {offerDetails.reviews.map((review: Review, index) => (
      <div key={index} className={styles.review}>
        <div className={styles.user}> 
          <img src="https://www.investopedia.com/thmb/t9ptoLnvjFl1qlVWhXIrnL17LGA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1205198865-48d9cf94a766422796067c893ef272e8.jpg" alt="" className={styles.userImg} /> {/* Use the userImg class */}
          <div>
            <p>{review.username}</p>
            <p>21-12-2023</p>
          </div>
        </div>
        <div>
          <Rate disabled defaultValue={review.rating} />
        </div>
        <div>
          <p>{review.comment}</p>
        </div>
      </div>
    ))}
  </div>
  );
}

export default Reviews;
