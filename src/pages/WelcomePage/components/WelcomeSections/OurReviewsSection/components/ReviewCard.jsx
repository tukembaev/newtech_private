import React from 'react'
import styles from './ReviewCard.module.scss'
import stars from 'assets/icons/welcomeIcons/stars.png'

const ReviewCard = ({ reviews }) => {
  return (
    <>
      {reviews.map((item) => (
        <div className={styles.wrapper} id="reviews">
          <img src={stars} className={styles.star} alt="" />
          <p style={{ fontSize: '14px' }}>{item.text}</p>
          <div className={styles.reviewer}>
            <img src={item?.user?.avatar} alt="" />
            <div>
              <h5>{item?.user?.name}</h5>
              <p style={{ fontSize: '12px' }}>{item?.user?.company}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ReviewCard
