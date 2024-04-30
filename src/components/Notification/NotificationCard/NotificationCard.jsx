import React from 'react'
import styles from './NotificationCard.module.scss'
import userIcon from 'assets/icons/ui-user.svg'

const NotificationCard = () => {
  return (
    <div className={styles.noti_card}>
      <div className={styles.noti_heading}>
        <div className={styles.user_info}>
          <h3 className={styles.user_login}>От: Ilyos</h3>
          <span className={styles.date}>7 октября 12:03</span>
          <span className={styles.body_title}>Добавлен новый сотрудник</span>
        </div>
      </div>
      <div className={styles.noti_body}>
        <h3 className={styles.body_title}>Добавлен новый сотрудник</h3>
        <div className={styles.feed}>
          <span className={styles.user__img__block}>
            <img className="styles.user__img" src={userIcon} />
          </span>
          <h4>Ilyos</h4>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
