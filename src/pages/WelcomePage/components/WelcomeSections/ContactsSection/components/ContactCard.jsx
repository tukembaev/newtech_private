import React from 'react'
import styles from './ContactCard.module.scss'
import { Button } from 'components'
const ContactCard = ({ image, title, text }) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt="" />

      <h4>{title}</h4>
      <p>{text}</p>
      <Button className="purple__welcome_btn">
        <span>Далее</span>
      </Button>
    </div>
  )
}

export default ContactCard
