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
          <div className={styles.userImg}>
            {review.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p>{review.username}</p>
            <p>Verified traveler</p>
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
