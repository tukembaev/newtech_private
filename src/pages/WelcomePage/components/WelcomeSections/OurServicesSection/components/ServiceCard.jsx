import React from 'react'
import styles from './Service.module.scss'

const ServiceCard = ({image,title,text}) => {
  return <div className={styles.wrapper}>
    <img src={image} alt="" />
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
}

export default ServiceCard
