import React from 'react'
import styles from './LastActionCard.module.scss'

const Action = ({ item }) => {
  return (
    <div className={styles.action}>
      <div className={styles.action_card}>
        <h4>{item?.text} </h4>
        <p>
          {item?.date_zayavki} {item?.create_date}
        </p>
      </div>
    </div>
  )
}

export default Action
