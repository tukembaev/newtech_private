import React from 'react'
import styles from './FeatureCard.module.scss'
const FeatureCard = ({ image, title, text }) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt="" />
      <div className={styles.right}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default FeatureCard
