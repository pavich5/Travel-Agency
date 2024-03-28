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
          <img src="https://hips.hearstapps.com/hmg-prod/images/kanye-west-attends-the-christian-dior-show-as-part-of-the-paris-fashion-week-womenswear-fall-winter-2015-2016-on-march-6-2015-in-paris-france-photo-by-dominique-charriau-wireimage-square.jpg" alt="" className={styles.userImg} /> 
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
